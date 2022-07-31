import qs from "query-string";


export const setQueryStringWithoutPageReload = qsValue => {
    const newurl = window.location.protocol + "//" +
        window.location.host +
        window.location.pathname +
        qsValue;


    console.log("Setting url to " + newurl);

    window.history.pushState({ path: newurl }, "", newurl);
};



export const setQueryStringValue = (
    key,
    value,
    queryString = window.location.search
) => {
    const values = qs.parse(queryString);
    const newQsValue = qs.stringify({ ...values, [key]: value });
    setQueryStringWithoutPageReload(`?${newQsValue}`);
};

export const getQueryStringValue = (
    key,
    queryString = window.location.search
) => {
    const values = qs.parse(queryString);
    return values[key];
};
