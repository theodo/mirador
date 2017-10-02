<template>
  <div class="row">
    <div class="col">
      <span class="badge badge-success mirador__badge" data-toggle="tooltip" data-placement="top" title="Done points on the board for this specific label.
⚠️ select your DONE Columns first">Done</span>
    </div>
    <div class="col" data-toggle="tooltip" data-placement="top" title="Estimated points on the board for this specific label.
⚠️ nomenclatura : '(points) Label'
Ex : ''(20) Admin dashboard'
">
      <span class="badge badge-dark mirador__badge">Estim</span>
    </div>
    <div class="col" data-toggle="tooltip" data-placement="top" title="Total points on the board for this specific label">
      <span class="badge badge-primary mirador__badge">Total</span>
    </div>
  </div>
</template>

<style>
.mirador__badge {
  font-size: 19px;
}
</style>
