<script lang="ts" setup>

import { ref } from "#imports";
import { confirm as confirmMessage } from "~/config/captcha/confirm";
import { error as errorMessage } from "~/config/captcha/error";
import { feiyunxi } from "~/config/captcha/feiyunxi";
import { xiao } from "~/config/captcha/xiao";

const emit = defineEmits({
  'passed': null,
});

const caseInSensCompare = (a: string, b: string): boolean => a.toLowerCase().trim() === b.toLowerCase().trim();

const setMatch = (set: string[], search: string) => set.some((s) => caseInSensCompare(s, search));

const answer = ref('');
const error = ref('');
const submitHandler = () => {
  if (!confirm(confirmMessage)) {
    return;
  }

  if (!answer.value) {
    error.value = errorMessage;
  }

  if (setMatch(xiao, answer.value)) {
    emit('passed', 'xiao');
    return;
  }

  if (setMatch(feiyunxi, answer.value)) {
    emit('passed', 'feiyunxi');
    return;
  }

  error.value = errorMessage;
};
</script>

<template>
  <form @submit.prevent="submitHandler">
    <div>
      <label for="question" class="form-label">Имя самого красивого мужчины на планете:</label>
      <input :class="{'is-invalid': !!error}"
             v-model.trim="answer"
             type="text"
             class="form-control form-control-lg"
             id="question"
             required>
      <div class="invalid-feedback" v-if="error">
        {{ error }}
      </div>

    </div>

    <button type="submit" class="btn btn-danger btn-lg">Да!</button>
  </form>
</template>

<style scoped lang="scss">
// Custom.scss
// Option B: Include parts of Bootstrap

// 1. Include functions first (so you can manipulate colors, SVGs, calc, etc)
@import "../node_modules/bootstrap/scss/functions";

// 2. Include any default variable overrides here

// 3. Include remainder of required Bootstrap stylesheets
@import "../node_modules/bootstrap/scss/variables";

// 4. Include any default map overrides here

// 5. Include remainder of required parts
@import "../node_modules/bootstrap/scss/maps";
@import "../node_modules/bootstrap/scss/mixins";
@import "../node_modules/bootstrap/scss/root";

// 6. Optionally include any other parts as needed
//@import "../node_modules/bootstrap/scss/utilities";
//@import "../node_modules/bootstrap/scss/type";
@import "../node_modules/bootstrap/scss/forms";
@import "../node_modules/bootstrap/scss/buttons";
//@import "../node_modules/bootstrap/scss/utilities";
//@import "../node_modules/bootstrap/scss/images";
//@import "../node_modules/bootstrap/scss/containers";
//@import "../node_modules/bootstrap/scss/grid";
//@import "../node_modules/bootstrap/scss/helpers";

// 7. Optionally include utilities API last to generate classes based on the Sass map in `_utilities.scss`
//@import "../node_modules/bootstrap/scss/utilities/api";

// 8. Add additional custom code here

form {
  text-align     : center;
  font-size      : 1.5rem;
  display        : flex;
  flex-direction : column;
  gap            : 1em;
  align-items    : center;
}
</style>
