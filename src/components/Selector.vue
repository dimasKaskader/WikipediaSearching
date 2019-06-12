<!-- данный компонент реализует возможность выбора размера страницы (количество результатов на одной страницу) -->
<template>
    <div id="option-selector">
        <span class="optionText">{{ text }}</span>
        <div class="option" :class="getClassForOption(option)" v-for="option in options" v-bind:key="option" @click="$emit('option-select', option)">{{ option }}</div>
    </div>
</template>

<script>

export default {
    name: 'option-selector',
    props: ['selectedOption', 'options', 'text'],
    data() {
        return {
            
        }
    },
    methods: {
        getClassForOption(option) {
            if(option === this.selectedOption) 
                return ['option', 'selected']
            else
                return 'soptionize'
        }
    }
}
</script>

<style>
#option-selector {
    text-align: left;
}

.optionText {
    /*float: left;*/
    height: 35px;
    font-size: 18px;
    line-height: 35px;
    margin-right: 10px;
    margin-left: 20px;
    margin-top: 5px;
}

.option {
    margin-right: 5px;
    height: 35px;
    /*width: 45px;*/
    width: auto;
    padding: 0 10px;
    border-radius: 20px;
    font-size: 18px;
    line-height: 35px;
    display: inline-block;
    text-align: center;
    margin-top: 5px;
}

.option:hover {
    box-shadow: 0 0 10px rgba(0,0,0,0.5);
    cursor: pointer;
}

.selected {
    background-color: black;
    color: white;
}
</style>
