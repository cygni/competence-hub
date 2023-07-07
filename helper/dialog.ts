export const openDialog = (id = "confirmDialog") => {
  const dialog = <HTMLDialogElement>document.getElementById(id);
  dialog.addEventListener("click", closeDialogIfOutside);
  dialog.addEventListener("cancel", closeDialogIfOutside);
  dialog.showModal();
};

export const closeDialogIfOutside = (ev: any, id = "confirmDialog") => {
  if (ev.target.id === id) closeDialog();
};

export const closeDialog = (id = "confirmDialog") => {
  const dialog = <HTMLDialogElement>document.getElementById(id);
  dialog.removeEventListener("click", closeDialogIfOutside);
  dialog.removeEventListener("cancel", closeDialogIfOutside);
  dialog.close();
};
