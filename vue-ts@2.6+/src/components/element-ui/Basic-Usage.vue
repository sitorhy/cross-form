<template>
  <CrossForm name="form">
    <CrossFormItem
        label="Username"
        name="username"
        :rules="[{ required: true, message: 'Please input your username!' }]"
    >
      <template #default>
        <el-input placeholder="Username"/>
      </template>
    </CrossFormItem>

    <CrossFormItem
        label="Password"
        name="password"
        :rules="[{ required: true, message: 'Please input your password!' }]"
    >
      <el-input type="password" placeholder="Password" v-model="password"/>
    </CrossFormItem>
  </CrossForm>
</template>

<script lang="ts">
import CrossFormItem from "@/components/vue/CrossFormItem";
import CrossForm from "@/components/vue/CrossForm";

export default {
  name: "Basic-Usage",
  components: {CrossForm, CrossFormItem},
  data() {
    return {
      password: ""
    }
  }
}
</script>

<style scoped>

</style>
