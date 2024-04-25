import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Text } from 'react-native';

const Formulario = () => {
  const [nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState('');
  const [edad, setEdad] = useState('');
  const [respuestas, setRespuestas] = useState([]);
  const [editingIndex, setEditingIndex] = useState(null);

  const guardarRespuestas = () => {
    if (+edad >= 0) {
      setRespuestas([...respuestas, { nombre, apellido, edad: +edad }]);
      setNombre('');
      setApellido('');
      setEdad('');
    }
  };

  const editarRespuesta = index => {
    setEditingIndex(index);
    setNombre(respuestas[index].nombre);
    setApellido(respuestas[index].apellido);
    setEdad(respuestas[index].edad.toString());
  };

  const actualizarRespuesta = index => {
    const newRespuestas = [...respuestas];
    newRespuestas[index] = { nombre, apellido, edad: +edad };
    setRespuestas(newRespuestas);
    setEditingIndex(null);
  };

  const eliminarRespuesta = index => {
    const newRespuestas = [...respuestas];
    newRespuestas.splice(index, 1);
    setRespuestas(newRespuestas);
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Nombre"
        value={nombre}
        onChangeText={setNombre}
      />
      <TextInput
        style={styles.input}
        placeholder="Apellido"
        value={apellido}
        onChangeText={setApellido}
      />
      <TextInput
        style={styles.input}
        placeholder="Edad"
        value={edad}
        onChangeText={setEdad}
        keyboardType="numeric"
      />
      <Button title="Guardar" onPress={guardarRespuestas} />

      {respuestas.map((respuesta, index) => (
        <View key={index} style={styles.respuestaContainer}>
          {editingIndex === index ? (
            <>
              <TextInput
                style={styles.input}
                placeholder="Nombre"
                value={nombre}
                onChangeText={setNombre}
              />
              <TextInput
                style={styles.input}
                placeholder="Apellido"
                value={apellido}
                onChangeText={setApellido}
              />
              <TextInput
                style={styles.input}
                placeholder="Edad"
                value={edad}
                onChangeText={setEdad}
                keyboardType="numeric"
              />
              <View style={styles.botonesContainer}>
                <Button title="Actualizar" onPress={() => actualizarRespuesta(index)} />
                <Button title="Cancelar" onPress={() => setEditingIndex(null)} />
              </View>
            </>
          ) : (
            <>
              <Text style={styles.respuestaText}>
                Nombre: {respuesta.nombre}, Apellido: {respuesta.apellido}, Edad: {respuesta.edad}
              </Text>
              <View style={styles.botonesContainer}>
                <Button title="Editar" onPress={() => editarRespuesta(index)} />
                <Button
                  title="Eliminar"
                  color="red"
                  onPress={() => eliminarRespuesta(index)}
                />
              </View>
            </>
          )}
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 30,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
  },
  respuestaContainer: {
    marginTop: 20,
  },
  respuestaText: {
    fontSize: 16,
    marginBottom: 10,
  },
  botonesContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

export default Formulario;