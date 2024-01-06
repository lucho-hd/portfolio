exports.handler = async (event, context) => {
    try {
      const data = JSON.parse(event.body);
      return {
        statusCode: 200,
        body: JSON.stringify({ message: "Formulario enviado con éxito" }),
      };
    } catch (error) {
      console.error("Error al procesar el formulario", error);
      return {
        statusCode: 500,
        body: JSON.stringify({ error: "Error al procesar el formulario" }),
      };
    }
  };