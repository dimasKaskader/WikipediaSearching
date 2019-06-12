/**  
 * данный модуль отвечает за сохранение и отборажение истории запросов
 * запросы сохраняются в Local Storage
 **/

function getHistory(reverse=true) {
    var history = localStorage.getItem('history')
    if (history) {
        history = history.split(',')
        if (reverse)
            return history.reverse()
        else
            return history
    }
    else
        return []
}

function saveToHistory(item) {
    var history = getHistory(false)
    if (history.length >= 10)
        history = history.splice(1)
    history.push(item)
    localStorage.setItem('history', history)
}

export {getHistory, saveToHistory}