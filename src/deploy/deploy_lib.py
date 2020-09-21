from absl import logging

import operator
import anki


def _find_unique_model(model_manager: anki.models.ModelManager, predicate, human_desc):
    found = list(filter(predicate, model_manager.all()))
    if not found:
        raise KeyError(f"Model not found: {human_desc}")
    if len(found) > 1:
        raise Exception(
            f"Multiple models matching {human_desc}: {map(operator.itemgetter('id'), found)}")
    return found[0]


def _find_model_by_uuid(model_manager, uuid):
    return _find_unique_model(model_manager, lambda model: model.get('crowdanki_uuid') == uuid, 'crowdanki_uuid ' + uuid)


def _find_model_by_name(model_manager, name):
    return _find_unique_model(model_manager, lambda model: model['name'] == name, 'name ' + name)


def _find_model_template(model, template_name):
    template_found = None
    for template in model['tmpls']:
        if template['name'] == template_name:
            if template_found:
                raise Exception(
                    'Multiple templates with name {}'.format(template_name))
            template_found = template
    if not template_found:
        available_templates = [template['name'] for template in model['tmpls']]
        raise KeyError('Template with name {} not found. Available: {}'.format(
            template_name, available_templates))
    return template_found


def _apply_model_update(model, model_update):
    if 'css' in model_update:
        model['css'] = model_update['css']

    for template_name, template_content in model_update['templates'].items():
        template_found = _find_model_template(model, template_name)
        if 'qfmt' in template_content:
            template_found['qfmt'] = template_content['qfmt']
        if 'afmt' in template_content:
            template_found['afmt'] = template_content['afmt']


def _find_model_by_mapping(model_manager, mapping):
    if 'crowdanki_uuid' in mapping:
        uuid = mapping['crowdanki_uuid']
        logging.info("Updating model with UUID %s", uuid)
        return _find_model_by_uuid(model_manager, uuid)
    elif 'name' in mapping:
        name = mapping['name']
        logging.info("Updating model with name %s", name)
        return _find_model_by_name(model_manager, name)
    else:
        raise Exception("invalid mapping spec")


def _check_field_names(model, model_update):
    field_names_in_anki = set(
        map(operator.itemgetter('name'), model['flds']))
    field_names_in_defn = set(model_update['fields'])
    if field_names_in_anki - field_names_in_defn:
        logging.error('Anki references undefined fields: %s',
                      field_names_in_anki - field_names_in_defn)
        # TODO: crash?
    if field_names_in_defn - field_names_in_anki:
        logging.error('Defn references fields not in Anki: %s',
                      field_names_in_defn - field_names_in_anki)


def _create_model(model_manager: anki.models.ModelManager, mapping, model_update):
    new_model = model_manager.new(mapping['name'])

    model_type = model_update['type']

    if model_type == 'normal':
        new_model['type'] = anki.consts.MODEL_STD
    elif model_type == 'cloze':
        new_model['type'] = anki.consts.MODEL_CLOZE
    else:
        raise Exception(
            f'Creating model of type {model_update["type"]} is not implemented')

    new_model['css'] = model_update['css']

    # create all new fields
    for field_name in model_update['fields']:
        # TODO(prvak): use this once released:
        # new_field = model_manager.new_field(field_name)
        # model_manager.add_field(new_model, new_field)
        new_field = model_manager.newField(field_name)
        model_manager.addField(new_model, new_field)

    # TODO(prvak): Test this.
    for template_name, template_content in model_update['templates'].items():
        #new_template = model_manager.new_template(template_name)
        new_template = model_manager.newTemplate(template_name)
        new_template['qfmt'] = template_content['qfmt']
        new_template['afmt'] = template_content['afmt']
        #model_manager.add_template(new_model, new_template)
        model_manager.addTemplate(new_model, new_template)

    model_manager.add(new_model)
    return new_model


def _apply_model_update_spec(model_manager, model_update_spec, slug,
                             add_if_missing):
    mapping = model_update_spec['mapping']
    slug_name = model_update_spec['model']
    logging.info('applying %s', slug_name)
    model_update = slug[slug_name]
    try:
        model = _find_model_by_mapping(model_manager, mapping)
        _check_field_names(model, model_update)
        _apply_model_update(model, model_update)
    except KeyError as e:
        if not add_if_missing:
            logging.error(f'Model for mapping {mapping} not found. If you want '
                          'to create it, pass --add_if_missing.', exc_info=True)
            raise

        logging.warning(
            f"Model for mapping {mapping} not found. Will try to create it.")

        if 'name' not in mapping:
            raise Exception(f'Model not found by mapping {mapping}, and it '
                            'cannot be created because its name is not '
                            'specified in the mapping') from e
        model = _create_model(model_manager, mapping, model_update)
        logging.info('Created new model with id %s', model['id'])

    model_manager.save(model)


def apply_slug(model_manager, config, slug, add_if_missing):
    for model_update_spec in config['models']:
        _apply_model_update_spec(model_manager, model_update_spec, slug,
                                 add_if_missing)
