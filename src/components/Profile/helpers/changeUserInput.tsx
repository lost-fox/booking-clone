export const changeUserInput = (e: React.MouseEvent<HTMLElement>) => {
  const input = document.querySelector(".info-input") as HTMLInputElement;
  (e.currentTarget as HTMLElement).textContent = input.disabled
    ? "Сохранить"
    : "Изменить";
  input.disabled = !input.disabled;
};
