<!-- данный компонент реализует отображение истории запросов, а также предлагаемых запросов -->
<template>
    <div id="history">
        <p :class="getHistClass(index)" v-for="(hist, index) in history" v-bind:key="index" @mouseenter="mouseEntered(index)"
        @click="mouseClicked(hist)">{{ hist }}</p>
    </div>
</template>

<script>
export default {
    name: 'history',
    props: ['selected', 'history'],
    methods: {
        getHistClass(index) {
            if (this.selected === index) 
                return ["histEntry", "selected"]
            else
                return ["histEntry"]
        },
        mouseEntered(index) {
            this.$emit('mouse-entered', index)
        },
        mouseClicked(hist) {
            this.$emit('hist-click', hist)
        }
    }
}
</script>

<style>
#history {
    margin-top: 5px;
    position: relative;
    width: 100%;
    margin-top: 0;
    background-color: white;
    box-shadow: 5px 5px 10px rgba(0,0,0,0.3);
}

.histEntry {
    width: calc(100% - 30px);
    height: 40px;
    line-height: 40px;
    margin: 0;
    font-size: 22px;
    text-align: left;
    overflow: hidden;
    text-overflow: ellipsis;
    padding: 0 15px;
}

.selected {
    background-color: #ccc;
    cursor: pointer;
}
</style>