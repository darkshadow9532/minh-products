Vue.component("editor", {
    props: ['content', 'nice'],
    data: function(){
        return {
            product_description: null
        }
    },
    methods: {
        open_editor: function(){
            if(!this.product_description) {
                this.product_description = new nicEditor({fullPanel : true}).panelInstance('product_description',{hasPanel : true});
                this.nice = new nicEditors.findEditor('product_description');
            } else {
                this.product_description.removeInstance('product_description');
                this.product_description = null;
            }
        },
    },
    template: `
        <div>
            <div v-html="content" id="product_description"></div>
            <button @click="open_editor(); $emit('update_nice', nice)">Sửa với Editor</button>
        </div>

    `,
    created(){

    },
    mounted(){

    }
})