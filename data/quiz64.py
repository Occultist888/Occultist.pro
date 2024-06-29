import json
import base64

def encode_base64(text):
    # Encode the given text to base64
    return base64.b64encode(text.encode('utf-8')).decode('utf-8')

# Read the JSON data from the input file
with open('quiz.json', 'r', encoding='utf-8') as file:
    data = json.load(file)

# Encode each correct_answer field to base64
for question in data['questions']:
    question['correct_answer'] = encode_base64(question['correct_answer'])

# Save the updated data to a new file
with open('quiz64.json', 'w', encoding='utf-8') as file:
    json.dump(data, file, ensure_ascii=False, indent=2)

print("Файл успешно сохранен как quiz64.json")