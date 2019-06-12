/**  
 * данный модуль отвечает за формирование запросов к API Wiki
 **/

const axios = require('axios');

const wikiAddress = 'https://ru.wikipedia.org/wiki/'

function getSearchWiki(query, callback, page=1, size=10, sorting='relevance', list='search') {
    const startTime = Date.now()
    if (sorting === 'релевантные')
        sorting = 'relevance'
    else if (sorting === 'новые')
        sorting = 'last_edit_desc'

    const params = {
        action: 'query',
        list: list,
        format: 'json',
        origin: '*',
        srlimit: size, //количество статей на странице
        sroffset: (page - 1) * size,  //сдвиг по количеству
        srsort: sorting, //сортировка
        srsearch: query
    }
    if(list === 'prefixsearch')
        params.pssearch = query
        
    axios.get('https://ru.wikipedia.org/w/api.php', {
        params
    })
    .then(function (response) {
        const time = Date.now() - startTime
        callback(response.data, time)
    })
    .catch(function (error) {
        callback(error)
    })

}

export {getSearchWiki, wikiAddress}