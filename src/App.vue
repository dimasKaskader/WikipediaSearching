<!-- данный компонент является корневым и управляет всеми остальными компонентами -->
<template>
    <div id="app">
        <p class="mainName">ВикиПоиск</p>
        <search-bar @find-click="searchWiki"/>
        <article-block v-for="(article, index) in articles" v-bind:key="article.pageid" :index="index + (page - 1) * pageSize" :article="article"/>
        <paginator @page-selected="turnPage" :currentPage="page" :pagesAmount="pagesAmount"/>
        <search-stats v-if="showStats" :requestTime="requestTime" :resultsAmount="resultsAmount"/>
        <settings @size-select="changePageSize" @sort-select="changeSorting" :pageSize="pageSize" :sorting="sorting"/>
    </div>
</template>

<script>
import SearchBar from './components/SearchBar.vue'
import ArticleBlock from './components/ArticleBlock.vue'
import Paginator from './components/Paginator.vue'
import SearchStats from './components/SearchStats.vue'
import Settings from './components/Settings.vue'
import {getSearchWiki} from './wiki.js'
import {saveToHistory} from './searchHistory.js'

export default {
    name: 'app',
    data() {
        return {
            query: "",
            articles: [],
            page: 1,
            pagesAmount: 0,
            resultsAmount: 0,
            requestTime: 0,
            showStats: false,
            pageSize: 10,
            sorting: 'релевантные'
        }
    },
    methods: {
        changePageSize(size) {
            this.pageSize = size
            if(this.query !== '')
                this.searchWiki(this.query)
        },
        changeSorting(sorting) {
            this.sorting = sorting
            if(this.query !== '')
                this.searchWiki(this.query)
        },
        setResult(result, requestTime) {
            this.showStats = true
            this.articles = result.query.search
            this.resultsAmount = result.query.searchinfo.totalhits
            this.pagesAmount = Math.ceil(this.resultsAmount / this.pageSize)
            this.requestTime = requestTime
        },
        searchWiki(query) {
            this.query = query
            saveToHistory(query)
            this.page = 1
            window.scrollTo(0, 0);
            getSearchWiki(query, this.setResult, 1, this.pageSize, this.sorting)
        },
        turnPage(page) {
            this.page = page
            this.articles = []
            window.scrollTo(0, 0);
            getSearchWiki(this.query, this.setResult, page, this.pageSize, this.sorting)
        }
    },
    components: {
        SearchBar,
        ArticleBlock,
        Paginator,
        SearchStats,
        Settings
    }
}
</script>

<style>
.mainName {
    font-size: 50px;
    margin-top: 100px;
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    color: #555;
}

#app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: black;
}
</style>
