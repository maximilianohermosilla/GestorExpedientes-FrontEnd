export interface Expediente{
    id: number;
    nombre: string;
    expediente1: string;
    fecha: string;
    documento: string;
    idCaratula: number;
    idActo: number;
    idSituacionRevista: number;
    fechaExpediente: string;
    firmadoSumario: boolean;
    firmadoLaborales: boolean;
    enviadoLaborales: boolean;
    avisado: boolean;
    observaciones: string;
}