import internalPSBC from "./_psBC";

const pSBC = (p: number, c0: string, c1?: string, l?: number) =>
  internalPSBC(p, c0, c1, l) as string;

export default pSBC;
