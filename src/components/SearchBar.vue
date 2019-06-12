<!-- данный компонент представляет собой строку поиска -->
<template>
    <div id="search-bar">
        <div class="search">
            <input class="searchBar" v-model="query" @keyup.enter="beginSearch" @click="searchClicked" @blur="blurHandler" 
            @keydown.down="downPressed" @keydown.up="upPressed" placeholder="Введите запрос" autofocus/>
            <history  @mouseenter.native="isMouseIn = true" @mouseleave.native="isMouseIn = false" v-if="showHistory" @hist-click="setQuery"
            @mouse-entered="setSelectedHist" :selected="selectedHist" :history="history"/>
        </div>
        <button class="findButton" @click="beginSearch">Найти</button>
    </div>
    
</template>

<script>
import History from './History.vue'
import {getHistory} from '../searchHistory.js'
import {getSearchWiki} from '../wiki.js'

export default {
    name: 'search-bar',
    data() {
        return{
            query: "",
            isMouseIn: false,
            showHistory: false,
            selectedHist: -1,
            history: []
        }  
    },
    watch: {
        query(newVal) {
            if (!this.history.some(hist => hist === newVal)) {
                this.selectedHist = -1
                if(newVal)
                    getSearchWiki(newVal, this.setResult, 1, 10, '', 'prefixsearch')
                else
                    this.openHistory()
            }
        }
    },
    methods: {
        setResult(result) {
            this.history = []
            result.query.prefixsearch.forEach((entry) => {
                this.history.push(entry.title)
            })
        },
        searchClicked() {
            if(this.query)
                getSearchWiki(this.query, this.setResult, 1, 10, '', 'prefixsearch')
            else
                this.openHistory()
            this.showHistory = true
            this.selectedHist = -1
        },
        openHistory() {
            this.history = getHistory()
        },
        setQuery(newQuery) {
            this.query = newQuery
            this.beginSearch()
        },
        setSelectedHist(index) {
            this.selectedHist = index
        },
        downPressed() {
            var newSelectedHist = this.selectedHist + 1
            if (newSelectedHist < this.history.length) {
                this.selectedHist = newSelectedHist
                this.query = this.history[this.selectedHist]
            }
        },
        upPressed() {
            if (this.selectedHist > -1) {
                this.selectedHist --
                this.query = this.history[this.selectedHist]
            }
        },
        beginSearch() {
            this.showHistory = false
            this.isMouseIn = false
            document.activeElement.blur() 
            this.$emit('find-click', this.query)
        },
        blurHandler() {
            if(!this.isMouseIn)
                this.showHistory = false
        }
    },
    components: {
        History
    }
}
</script>

<style>
#search-bar {
    margin: auto;
    width: 674px;
    margin-top: 50px;
    height: 50px;
    display: flex;
    align-items: center;
}

.search {
    width: 560px;
    height: 48px;
}

.searchBar {
    width: 526px;
    height: 44px;
    font-size: 22px;
    padding: 0 15px; 
}

.searchBar:focus {
    outline: black auto 5px;
}

.findButton {
    margin-left: 30px;
    height: 48px;
    width: 90px;
    background-color: black;
    border: none;
    color: white;
    font-size: 22px;
}

.findButton:hover {
    background-color: #555;
    cursor: pointer;
}
</style>