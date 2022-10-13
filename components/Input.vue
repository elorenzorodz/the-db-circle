<template>
    <div>
        <v-row>
            <v-col>
                <div>
                    <v-text-field v-model="userInput" label="Main input"></v-text-field>
                    <v-btn elevation="2" @click="addInput()">Save</v-btn>
                </div>
            </v-col>
        </v-row>
        <v-row>
            <v-col>
                <v-simple-table>
                    <thead>
                        <th class="text-left">ID</th>
                        <th class="text-left">Text input</th>
                    </thead>
                    <tbody>
                        <tr v-for="input in inputs" :key="input.id">
                            <td>{{ input.id }}</td>
                            <td>{{ input.data.text }}</td>
                        </tr>
                    </tbody>
                </v-simple-table>
            </v-col>
        </v-row>
    </div>
</template>

<script>
export default {
    name: 'InputPage',
    data() {
        return {
            userInput: null,
            inputs: []
        }
    },
    async mounted() {
        await this.getInputs();
    },
    methods: {
        async getInputs() {
            const inputs = await this.$axios.get("getInputs");

            this.inputs = inputs.data;
        },
        async addInput() {
            const result = await this.$axios.get("addInput?text=" + this.userInput);

            this.inputs.push({
                "id": result.data.id, 
                "data": { "text": this.userInput }
            });
        }
    }
}
</script>
    