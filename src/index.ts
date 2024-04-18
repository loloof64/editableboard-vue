import EditableBoardVue from "./components/EditableBoardVue.vue";

const EditableBoardVueComponent = {
    install(Vue: any) {
        Vue.component('EditableBoardVue', EditableBoardVue);
    }
}

export default EditableBoardVueComponent;
