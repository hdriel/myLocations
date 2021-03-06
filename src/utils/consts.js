export const CRUD_ACTIONS = {
    CREATE: 'CREATE',
    UPDATE: 'EDIT',
    VIEW: 'VIEW',
    DELETE: 'DELETE',
    NONE: '',
}

const CRUD_ACTIONS_SECTION = (section) => ({
    CREATE: `${CRUD_ACTIONS.CREATE} ${section}`,
    UPDATE: `${CRUD_ACTIONS.UPDATE} ${section}`,
    VIEW: `${CRUD_ACTIONS.VIEW} ${section}`,
    DELETE: `${CRUD_ACTIONS.DELETE} ${section}`,
});
export const CATEGORY_SECTION = 'CATEGORY';
export const CATEGORY_ACTIONS = CRUD_ACTIONS_SECTION(CATEGORY_SECTION);

export const LOCATION_SECTION = 'LOCATION';
export const LOCATION_ACTIONS = CRUD_ACTIONS_SECTION(LOCATION_SECTION);

export const TITLE_REPLACE_ACTION = '{{ACTION}}';
export const TITLE_REPLACE_CATEGORY = '{{CATEGORY}}';
