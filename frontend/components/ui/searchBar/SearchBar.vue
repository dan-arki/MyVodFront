<template>
  <!-- <UContentSearchButton class="searchBar" label="Que cherchez vous ?" /> -->
  <div
    class="searchBarContainer flex flex-col justify-center items-center self-center"
  >
    <div class="flex relative w-full">
      <input type="text" class="searchBar" placeholder="Que cherchez-vous ?" />
      <img
        src="/iconSearch.svg"
        alt="searchIcon"
        class="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5"
      />
    </div>
  </div>
</template>

<style scoped>
.searchBarContainer {
  width: 40%;
}

.searchBar {
  background-color: rgba(255, 255, 255, 0.1);
  color: #8ca1ba;
  width: 100%;
  height: 100%;
  padding: 8px 16px; /* Ajoute du padding pour améliorer l'apparence */
  border: solid 1px #8ca1ba;
  border-radius: 16px; /* Ajoute des coins arrondis */
  font-size: 16px;
  outline: none; /* Supprime le contour par défaut */
}

.searchBar::placeholder {
  color: #8ca1ba; /* Couleur du placeholder */
}

.searchBar:hover {
  background-color: rgba(
    255,
    255,
    255,
    0.2
  ); /* Légère variation de couleur au survol */
}

.searchBar:focus {
  background-color: rgba(
    255,
    255,
    255,
    0.2
  ); /* Variation de couleur lorsqu'elle est focus */
  color: #ffffff;
}
</style>
