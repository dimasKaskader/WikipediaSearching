<!-- данный компонент представляет собой одну статью, отображаемую в результатах запроса -->
<template>
    <div id="article">
        <span class="number">{{ this.index + 1 }}</span>
        <a class="title" target="_blank" :href="link">{{ this.article.title }}</a>
        <span class="date">Дата: {{ this.date }}</span>
        <a class="link" target="_blank" :href="link">{{ this.link }}</a>
        <span class="snippet" v-html="article.snippet + '...'"/>
        
    </div>
</template>

<script>
import {wikiAddress} from '../wiki.js'

export default {
    name: 'article-block',
    props: ['article', 'index', 'pagesAmount'],
    computed: {
        link() {
            return wikiAddress + this.article.title
        },
        date() {
            return this.parseDate(this.article.timestamp)
        }
    },
    methods: {
        parseDateNumber(dateNumber) {
            return (dateNumber >= 10) ? '' + dateNumber : '0' + dateNumber
        },

        parseDate(dateString) {
            var date = new Date(dateString)
            var dateStr = ''
            var day = date.getDate()
            day = this.parseDateNumber(day)
            var month = date.getMonth() + 1
            month = this.parseDateNumber(month)
            dateStr += day + '.' + month + '.' + date.getFullYear()
            return dateStr
        }
    },
    components: {
    }
}
</script>

<style>
#article {
    margin-top: 15px;
    margin-left: auto;
    margin-right: auto;
    max-height: 100px;
    width: 674px;
    display: block;
}

.title {
    display: block;
    height: 20px;
    width: auto;
    font-size: 18px;
    padding: 0 5px;
    color: darkblue;
    text-decoration: none;
    text-align: left;
    overflow: hidden;
    text-overflow: ellipsis;
}

.link {
    display: block;
    height: 20px;
    width: auto;
    padding: 0 20px;
    color: #555;
    text-decoration: none;
    text-align: left;
    overflow: hidden;
    text-overflow: ellipsis;
}

.title:hover, .link:hover {
    color: crimson;
}

.snippet {
    display: block;
    margin-top: 5px;
    text-align: justify;
    padding: 0 5px 0 20px;
}

.searchmatch {
    font-weight: 600;
}

.number {
    float: left;
    height: 20px;
    font-size: 12px;
    line-height: 20px;
    width: 15px;
    text-align: left;
}

.date {
    font-size: 15px;
    color: #555;
    float: right;
}
</style>
