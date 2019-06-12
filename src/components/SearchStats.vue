<!-- данный компонент реализует вывод информации о запросе -->
<template>
    <div id="search-stats" >
        <p class="statsText" v-if="resultsAmount > 0">
            Найдено <span class="bold">{{resultsAmount}}</span> результатов
            за <span class="bold">{{requestTime / 1000}}</span> с.
        </p>
        <p v-else>
            По введенному запросу результатов не найдено
        </p>
    </div>
</template>

<script>

export default {
    name: 'search-stats',
    props: ['resultsAmount', 'requestTime'],
    data() {
        return {

        }
    },
}
</script>

<style>
#search-stats {
    width: 674px;
    margin: auto;
}

.statsText {
    float: right;
}

.bold {
    font-weight: 600;
}
</style>
