import i18n from '@/i18n'
import { email, max, min, required } from '@vee-validate/rules'
import { configure, defineRule } from 'vee-validate'

configure({
  generateMessage: (context) => {
    const field = context.field
    const params = context?.rule?.params ?? {}
    const rule = context.rule ?? { name: '' }
    const messages = {
      required: (field) => i18n.global.t('validation.required', { field }),
      email: (field) => i18n.global.t('validation.email', { field }),
      min: (field, params) => i18n.global.t('validation.min', { field, min: params[0] }),
      max: (field, params) => i18n.global.t('validation.max', { field, max: params[0] }),
      fileType: (field, params) =>
        i18n.global.t('validation.fileType', { field, allowedTypes: params.join(', ') })
    }

    return messages[rule.name]?.(field, params) || i18n.global.t('validation.default', { field })
  }
})
export default () => {
  defineRule('required', required)
  defineRule('email', email)
  defineRule('max', max)
  defineRule('min', min)
  defineRule('fileType', (value, allowedTypes) => {
    if (!value || !value.length) return true

    const fileExtension = value.split('.').pop()

    return (
      allowedTypes.includes(fileExtension.toLowerCase()) ||
      i18n.global.t('validation.fileType', { field: 'file', allowedTypes: allowedTypes.join(', ') })
    )
  })
}
