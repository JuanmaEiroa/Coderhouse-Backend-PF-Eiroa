//Importación de Commander y definición de variable
import { Command } from "commander";

const program = new Command();

//Definición de opciones para su uso en consola
program.option("--p <port>", "Puerto del servidor", 3000);
program.option("--pers <persistence>", "Modo de persistencia", "mongo");
program.option("--env <environment>", "Entorno", "development");
program.option("--host <host>", "Host", "0.0.0.0");

program.parse();

export default program;
