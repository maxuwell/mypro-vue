<template>
  <div>
    <Button class='btn' type="primary" @click='RSA()'>RSA</Button>
    <a href="https://www.hellojava.com/article/25619" target='_blank'>RSA2生成秘钥、公钥工具下载链接</a>
    <br>
    <Button class='btn' @click='xlsxOutSingleHeader()'>XLSX单行表头</Button>
    <Button class='btn' @click='xlsxOutMixinsHeader()'>XLSX多行复杂表头</Button>
  </div>
</template>

<script>
  import JsEncrypt from 'jsencrypt'
  import {outputProjectInfo} from '../../utils/mixins/outputProjectInfo'
  export default {
    mixins: [outputProjectInfo],
    methods:{
      RSA(){
        let jse = new JsEncrypt()
        jse.setPublicKey(`-----BEGIN PUBLIC KEY-----
          MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQDBxU8rTFghlFOzlspBiUNRyateg1xA5hLaigiaFjoK42iTJXh+luB7NXaKUjml8dTzPl+ovvDtKNKfBQ0iecnIlAh8Mq79SoakdiN+C+KftlEt3fzF+YPcIVrsakVco0luRcUs1t5Hv9MDUFOOqHtu0DXNjJA36qZEgapuGxy/0wIDAQAB
            -----END PUBLIC KEY-----`)
        let encrypted = jse.encrypt('Hello, world')
        // 输出加密结果
        console.log(encrypted)
        // 设置密钥
        jse.setPrivateKey(`-----BEGIN RSA PRIVATE KEY-----
            MIICXQIBAAKBgQDBxU8rTFghlFOzlspBiUNRyateg1xA5hLaigiaFjoK42iTJXh+luB7NXaKUjml8dTzPl+ovvDtKNKfBQ0iecnIlAh8Mq79SoakdiN+C+KftlEt3fzF+YPcIVrsakVco0luRcUs1t5Hv9MDUFOOqHtu0DXNjJA36qZEgapuGxy/0wIDAQABAoGBALBNgxwFKYbb+1BCmaIJbwwCbv7ejFisPWlEAFGaeZMgmCySAlFDm9neqg1uhO882qG7FbRmjrVp2EFBilLc9r8IY23Hh3Rstzotz1N5VO36OtETZnAYyRG6VB1sR2WQJKnWVr7ackWovg0x8y8PQioC77aJ1UP0wqOYyCUSJ1PJAkEA6Q116pTsulJ1OW5zWaDKvYVSSh3LMTgKxUaCt8/tz8rmuhjhdN22863TWIw0jFzNL5jetNvyBCWKFLWOBml2HwJBANTZrJRV3Ftqfn51uoJX2blIjYNg6naDl9DoRoIb/SGG11ok3lfNDiEP3P4yCLRPDag2k5IiLiIQd770J5mnt80CQD3CAmhqlJz/cu8INOsgb/lvFhJr+MePOVNzzvoU0MlK1H+mTkCg7HWAr8v8Q4Sapwkg8ots6aJtrDy2q+9JDTMCQQCH+0zLM5Nk/8MybWorTY62VYi7D1abQnTiLRKmmtT771Zzq6w0sbc+HhFUgIiZEQwrlDpxGM8aSiUGZJtMCh9dAkAsvWzHG68zcnPGvOSyRyT9eEDCz7Jr9AXok7ZFeJqF/VHWYp7/1TdKytwmlKjGqYANehVm+oLXpXog0tDdDPSV
            -----END RSA PRIVATE KEY-----`)
        // 解密加密过的字符串
        let decrypted = jse.decrypt(encrypted)
        // 打印结果
        console.log(decrypted)
      },
      xlsxOutSingleHeader(){
        this.memberToExcal([{}])
      },
      xlsxOutMixinsHeader(){
        this.costToExcal([{}])
      },
    }
  }
</script>

<style lang='less' scoped>
@import './style.less';
</style>
