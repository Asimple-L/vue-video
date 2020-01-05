<template>
  <!--修改资料-->
  <div class="tab-pane in" id="update-info">
    <div class="margin-top-30 text-center">
      <label for="oldPwd" class="control-label sr-only">旧密码：</label>
      <input type="password" class="form-control" name="oldPwd" id="oldPwd" placeholder="旧密码" autocomplete="off">
    </div>
    <div class="margin-top-30 text-center">
      <label for="rePwd" class="control-label sr-only">再次输入：</label>
      <input type="password" class="form-control" name="rePwd" id="rePwd" placeholder="再次输入旧密码" autocomplete="off">
    </div>
    <div class="margin-top-30 text-center">
      <label for="newPwd" class="control-label sr-only">新密码：</label>
      <input type="password" class="form-control" name="newPwd" id="newPwd" placeholder="新密码" autocomplete="off">
    </div>
    <div class="margin-top-30 text-center"><a href="javascript:void(0);" class="btn btn-default" onclick="updatePassword()">提交修改</a></div>
  </div>
</template>

<script>
    export default {
      // 更新信息页面
      name: "update-info"
    }
</script>

<style scoped>

</style>
