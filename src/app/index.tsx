import { useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

type ResultadoType = {
  gorjeta: string;
  total: string;
  porPessoa: string;
};

export default function App() {
  const [conta, setConta] = useState<string>("");
  const [percentualGorjeta, setPercentualGorjeta] = useState<string>("");
  const [numPessoas, setNumPessoas] = useState<string>("");
  const [resultado, setResultado] = useState<ResultadoType | null>(null);

  const calcular = () => {
    const valorConta = parseFloat(conta.replace(",", "."));
    const percentual = parseFloat(percentualGorjeta.replace(",", "."));
    const pessoas = parseInt(numPessoas, 10);

    if (
      isNaN(valorConta) ||
      isNaN(percentual) ||
      isNaN(pessoas) ||
      pessoas <= 0
    ) {
      alert(
        "Por favor, preencha todos os campos com valores numéricos válidos.",
      );
      return;
    }

    const valorGorjeta = valorConta * (percentual / 100);
    const valorTotal = valorConta + valorGorjeta;
    const valorPorPessoa = valorTotal / pessoas;

    setResultado({
      gorjeta: valorGorjeta.toFixed(2).replace(".", ","),
      total: valorTotal.toFixed(2).replace(".", ","),
      porPessoa: valorPorPessoa.toFixed(2).replace(".", ","),
    });
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>Cálculo de Gorjeta</Text>
          <Text style={styles.subtitle}>Engenharia da Computação</Text>
          <Text style={styles.members}>
            Integrantes: Arthur Christhopher Pires Dutra e Pedro
          </Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.label}>Valor da Conta (R$)</Text>
          <TextInput
            style={styles.input}
            keyboardType="numeric"
            placeholder="Ex: 150.00"
            placeholderTextColor="#888"
            value={conta}
            onChangeText={setConta}
          />

          <Text style={styles.label}>Percentual da Gorjeta (%)</Text>
          <TextInput
            style={styles.input}
            keyboardType="numeric"
            placeholder="Ex: 10"
            placeholderTextColor="#888"
            value={percentualGorjeta}
            onChangeText={setPercentualGorjeta}
          />

          <Text style={styles.label}>Dividir por quantas pessoas?</Text>
          <TextInput
            style={styles.input}
            keyboardType="numeric"
            placeholder="Ex: 3"
            placeholderTextColor="#888"
            value={numPessoas}
            onChangeText={setNumPessoas}
          />

          <TouchableOpacity style={styles.button} onPress={calcular}>
            <Text style={styles.buttonText}>Calcular</Text>
          </TouchableOpacity>
        </View>

        {resultado && (
          <View style={styles.resultCard}>
            <Text style={styles.resultTitle}>Resumo da Conta</Text>

            <View style={styles.resultRow}>
              <Text style={styles.resultLabel}>Valor da Gorjeta:</Text>
              <Text style={styles.resultValue}>R$ {resultado.gorjeta}</Text>
            </View>

            <View style={styles.resultRow}>
              <Text style={styles.resultLabel}>Total da Conta:</Text>
              <Text style={styles.resultValue}>R$ {resultado.total}</Text>
            </View>

            <View style={styles.resultDivider} />

            <View style={styles.resultRow}>
              <Text style={styles.resultLabelHighlight}>Total por Pessoa:</Text>
              <Text style={styles.resultValueHighlight}>
                R$ {resultado.porPessoa}
              </Text>
            </View>
          </View>
        )}
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: "#0B0914",
    padding: 20,
    justifyContent: "center",
  },
  header: {
    alignItems: "center",
    marginBottom: 30,
    marginTop: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#E0E0E0",
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 16,
    color: "#9D4EDD",
    marginBottom: 5,
  },
  members: {
    fontSize: 12,
    color: "#888",
    textAlign: "center",
  },
  card: {
    backgroundColor: "#1A1428",
    borderRadius: 15,
    padding: 20,
    borderWidth: 1,
    borderColor: "#3C2069",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
  },
  label: {
    fontSize: 14,
    color: "#B0A8B9",
    marginBottom: 8,
    fontWeight: "600",
  },
  input: {
    backgroundColor: "#0B0914",
    color: "#FFF",
    borderRadius: 8,
    padding: 12,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: "#2A1F40",
    fontSize: 16,
  },
  button: {
    backgroundColor: "#7B2CBF",
    borderRadius: 8,
    padding: 15,
    alignItems: "center",
    marginTop: 10,
  },
  buttonText: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "bold",
    textTransform: "uppercase",
  },
  resultCard: {
    backgroundColor: "#240046",
    borderRadius: 15,
    padding: 20,
    marginTop: 25,
    borderWidth: 1,
    borderColor: "#5A189A",
  },
  resultTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#FFF",
    marginBottom: 15,
    textAlign: "center",
  },
  resultRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  resultLabel: {
    color: "#C77DFF",
    fontSize: 16,
  },
  resultValue: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "bold",
  },
  resultDivider: {
    height: 1,
    backgroundColor: "#5A189A",
    marginVertical: 15,
  },
  resultLabelHighlight: {
    color: "#E0B1CB",
    fontSize: 18,
    fontWeight: "bold",
  },
  resultValueHighlight: {
    color: "#FFF",
    fontSize: 20,
    fontWeight: "bold",
  },
});
