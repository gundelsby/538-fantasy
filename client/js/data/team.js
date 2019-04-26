function getRealName(id) {
    if (id === 2791) {
        return 'søpla';
    }
    else if (id === 438) {
        return 'bartepakket';
    }
    else {
        return null;
    }
}
export function parse(json) {
    const { code, id, d_rating, o_rating } = json;
    const name = getRealName(id) || json.name;
    return {
        code,
        id,
        name,
        d_rating,
        o_rating
    };
}
