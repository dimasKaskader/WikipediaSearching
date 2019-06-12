<!-- данный компонент реализует функционал перелистывания страниц запроса -->
<template>
    <div id="paginator">
        <div v-if="showGoToStart" class="goToStart" @click="selectPage(1)">В начало</div>
        <div v-for="page in pages" v-bind:key="page" :class="getPageClass(page)" @click="selectPage(page)">
            {{ page }}
        </div>
    </div>
</template>

<script>
import {range} from '../helpers.js'

export default {
    name: 'paginator',
    props: ['pagesAmount', 'currentPage'],
    data() {
        return {
            pages: [],
            showGoToStart: false
        }
    },
    mounted() {
        this.updatePaginator()
    },
    watch: { 
        pagesAmount(newVal, oldVal) {
            if (newVal !== oldVal) {
                this.showGoToStart = false
            }
            this.updatePaginator()
        },
        currentPage() {
            this.updatePaginator()
        }
    },
    methods: {
        updatePaginator() {
            if (this.currentPage <= 3) {
                if (this.pagesAmount >= 5)
                    this.pages = range(1, 6)
                else
                    this.pages = range(1, this.pagesAmount + 1)
            }
            else if (this.currentPage <= this.pagesAmount - 2)
                this.pages = range(this.currentPage - 2, this.currentPage + 3)
            
            else {
                var from = this.pagesAmount - 5
                if (from >= 1)
                    this.pages = range(from, this.pagesAmount + 1)
                else
                    this.pages = range(1, this.pagesAmount + 1)
            }
            if (this.pages[0] === 1 || !this.pages[0])
                this.showGoToStart = false
            else
                this.showGoToStart = true
        },
        getPageClass(page) {
            if (page === this.currentPage)
                return ['pageNumber', 'selectedPageNumber']
            else
                return ['pageNumber']
        },
        selectPage(page) {
            this.$emit('page-selected', page)
        }
    },
    components: {
    }
}
</script>

<style>
#paginator {
    margin: 25px auto 0 auto;
    width: 674px;
}

.pageNumber, .goToStart {
    width: 35px;
    height: 35px;
    line-height: 35px;
    border-radius: 20px;
    font-size: 20px;
    display: inline-block;
    margin: 0 5px;
    -moz-user-select: none;
    -khtml-user-select: none;
    -webkit-user-select: none;
    user-select: none;
}

.pageNumber:hover, .goToStart:hover {
    box-shadow: 0 0 10px rgba(0,0,0,0.5);
    cursor: pointer;
}

.selectedPageNumber {
    background-color: black;
    color: white;
}

.goToStart {
    width: 100px;
}

</style>
