<template>
  <div>
    <h1>Uh-Oh!</h1>
    <h3>
      It looks like you're experiencing some network issues. Please click the
      back button or
    </h3>
    <router-link :to="{ name: 'event-list' }"
      >go back to the home page.</router-link
    >
  </div>
</template>

<script>
export default {};
</script>

<style scoped></style>
