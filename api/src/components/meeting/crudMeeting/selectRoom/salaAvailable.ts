import { Meeting } from "../../../../types/MeetingTypes";
import { SalaAvailable, SalaPresencial } from "../../../../types/roomPresencialTypes";

const generateSalaAvailable = (
  salas: SalaPresencial[],
  reunioes: Meeting[],
  inicioDate: Date,
  terminoDate: Date
): SalaAvailable[] => {
  const salaAvailable: SalaAvailable[] = [];

/*   console.log("Data Início Recebida:", inicioDate);
  console.log("Data Término Recebida:", terminoDate); */

  // Iterar sobre cada sala
  for (const sala of salas) {
    let isAvailable = true;

    // Iterar sobre cada reunião
    for (const reuniao of reunioes) {
      if (reuniao.sala_presencial_id === sala.id_sala_presencial) {
        const reuniaoInicio = new Date(reuniao.data_inicio);
        const reuniaoFinal = new Date(reuniao.data_final);

/*         console.log(`Verificando sala ${sala.nome}`);
        console.log("Reunião Início:", reuniaoInicio);
        console.log("Reunião Término:", reuniaoFinal); */

        if (
          (reuniaoInicio >= inicioDate && reuniaoInicio < terminoDate) ||
          (reuniaoFinal > inicioDate && reuniaoFinal <= terminoDate) ||
          (reuniaoInicio <= inicioDate && reuniaoFinal >= terminoDate)
        ) {
          /* console.log("Sala indisponível devido a reunião:", reuniao); */
          isAvailable = false;
          break;
        }
      }
    }
    salaAvailable.push({ ...sala, available: isAvailable });
    /* console.log(`Sala ${sala.nome} disponível: ${isAvailable}`); */
  }

  /* console.log("Resultado Final de Sala Available:", salaAvailable); */

  return salaAvailable;
};

export default generateSalaAvailable;
