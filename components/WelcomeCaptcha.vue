<script lang="ts" setup>

const emit = defineEmits({
  'passed': null,
});


const isAnswerCorrect = () => {
  // TODO: Перевірити правильнітсь відповіді
  return true;
};

const submitHandler = () => {
  if (isAnswerCorrect()) {
    emit('passed');
  }

};
</script>

<template>
  <form @submit.prevent="submitHandler">
    <div>
      <label for="question" class="form-label">Имя самого лучшего мужчины на планете:</label>
      <input type="text" class="form-control form-control-lg" id="question" required>
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
