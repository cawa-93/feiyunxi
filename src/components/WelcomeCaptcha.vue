<script lang="ts" setup>

import { ref } from "vue";
import { confirm as confirmMessage } from "../config/captcha/confirm";
import { error as errorMessage } from "../config/captcha/error";
import { feiyunxi } from "../config/captcha/feiyunxi";
import { xiao } from "../config/captcha/xiao";

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

<style scoped>
form {
  text-align: center;
  font-size: 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 1em;
  align-items: center;
}

.btn {
  --bs-btn-color: #fff;
  --bs-btn-bg: #dc3545;
  --bs-btn-border-color: #dc3545;
  --bs-btn-padding-y: 0.5rem;
  --bs-btn-padding-x: 1rem;
  --bs-btn-font-size: 1.25rem;
  --bs-btn-border-radius: 0.5rem;
  --bs-btn-font-weight: 400;
  --bs-btn-line-height: 1.5;
  --bs-btn-border-width: 1px;
  background-color: var(--bs-btn-bg);
  border: var(--bs-btn-border-width) solid var(--bs-btn-border-color);
  border-radius: var(--bs-btn-border-radius);
  color: var(--bs-btn-color);
  cursor: pointer;
  display: inline-block;
  font-size: var(--bs-btn-font-size);
  font-weight: var(--bs-btn-font-weight);
  line-height: var(--bs-btn-line-height);
  padding: var(--bs-btn-padding-y) var(--bs-btn-padding-x);
  text-align: center;
  text-decoration: none;
  transition: color .15s ease-in-out, background-color .15s ease-in-out, border-color .15s ease-in-out, box-shadow .15s ease-in-out;
  user-select: none;
  vertical-align: middle;
}


[type="submit"]:not(:disabled), button:not(:disabled) {
  cursor: pointer;
}

.form-label {
  margin-bottom: .5rem;
  display: inline-block;
}

.form-control {
  appearance: none;
  background-clip: padding-box;
  background-color: #fff;
  border: 1px solid #ced4da;
  border-radius: .5rem;
  color: #212529;
  display: block;
  font-size: 1.25rem;
  font-weight: 400;
  line-height: 1.5;
  padding: .5rem 1rem;
  transition: border-color .15s ease-in-out, box-shadow .15s ease-in-out;
  width: 100%;
  min-height: calc(1.5em + 1rem + 2px);
}

.form-control:focus {
  color: #212529;
  background-color: #fff;
  border-color: #86b7fe;
  outline: 0;
  box-shadow: 0 0 0 .25rem #0d6efd40;
}

button, input {
  font-family: inherit;
  font-size: inherit;
  line-height: inherit;
  margin: 0;
}

.invalid-feedback {
  color: #dc3545;
  font-size: .875em;
  margin-top: .25rem;
  width: 100%;
}
</style>
