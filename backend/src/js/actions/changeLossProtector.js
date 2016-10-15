export function protectChanges() {
  return {
    type: 'PROTECT_CHANGES',
  };
}

export function unprotectChanges() {
  return {
    type: 'UNPROTECT_CHANGES',
  };
}
