<template>
  <div>
    <el-dialog title="添加用户" :visible.sync="incrementForm">
      <el-form :model="addForm">
        <el-form-item label="日期" :label-width="formLabelWidth">
          <el-date-picker v-model="addForm.date" type="date" placeholder="选择日期">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="姓名" :label-width="formLabelWidth">
          <el-input v-model="addForm.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="地址" :label-width="formLabelWidth">
          <el-input v-model="addForm.address" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="addCancelFn">取 消</el-button>
        <el-button type="primary" @click="addConfirmFn">确定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "AddDialog",
  props: ["addForm", "incrementForm", "formLabelWidth"],
  methods: {
    addCancelFn() {
      this.$emit("my_addCancel")
    },
    addConfirmFn() {
      this.$emit("my_addConfirm")
    },
  },
}
</script>

<style lang="scss" scoped></style>
