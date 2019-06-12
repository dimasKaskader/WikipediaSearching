<!-- данный компонент реализует возможность выбирать различные настройки поиска -->
<template>
    <div id="settings">
        <transition name="sizeSelectorAppear">
            <div v-if="settingsOpened" class="settingsBackground">
                <selector @option-select="changeSorting" :options="sortOptions" :text="sortText" :selectedOption="sorting"/>
                <selector @option-select="changePageSize" :options="sizeOptions" :text="sizeText" :selectedOption="pageSize"/>
            </div>
        </transition>
        <div :class="getButtonClasses()" @click="settingsOpened = !settingsOpened">Настройки</div>
    </div>
</template>

<script>
import Selector from './Selector.vue'

export default {
    name: 'settings',
    props: ['pageSize', 'sorting'],
    data() {
        return {
            settingsOpened: false,
            sizeOptions: [10, 15, 20, 25, 50],
            sizeText: 'Выводить по:',
            sortOptions: ['релевантные', 'новые'],
            sortText: 'Сначала показывать:'
        }
    },
    mounted() {
        document.onclick = (e) => {
            if (this.$el !== e.target.parentNode)
                this.settingsOpened = false
        }
    },
    methods: {
        changePageSize(size) {
            this.settingsOpened = false
            this.$emit('size-select', size)
        },
        changeSorting(sorting) {
            this.settingsOpened = false
            this.$emit('sort-select', sorting)
        },
        getButtonClasses() {
            if (this.settingsOpened)
                return ['settingsButton', 'settingsButtonPressed']
            else
                return 'settingsButton'
        }
    },
    components: {
        Selector
    }
}
</script>

<style>
#settings {
    position: fixed;
    bottom: 10px;
    left: 10px;
}

.settingsBackground {
    height: 140px;
    background-color: rgba(255,255,255,0.9);
    position: fixed;
    bottom: 0;
    left: 0;
    z-index: 0;
    box-shadow: 5px 5px 10px rgba(0,0,0,0.3);
}

.sizeSelectorAppear-enter-active {
  animation: bounce-in .2s;
}
.sizeSelectorAppear-leave-active {
  animation: bounce-in .2s reverse;
}
@keyframes bounce-in {
    0% {
        opacity: 0.0;
        transform: translate(-100px, 100px) scale(0);
    }
    100% {
        opacity: 1;
        transform: translate(0, 0) scale(1);
    }
}

.settingsButton {
    height: 35px;
    line-height: 35px;
    text-align: center;
    font-size: 18px;
    border-radius: 20px;
    width: 130px;
    -moz-user-select: none;
    -khtml-user-select: none;
    -webkit-user-select: none;
    user-select: none;
    z-index: 10;
    position: fixed;
    bottom: 10px;
}

.settingsButton:hover {
    box-shadow: 0 0 10px rgba(0,0,0,0.5);
    cursor: pointer;
}

.settingsButtonPressed {
    background-color: black;
    color: white;
}
</style>
