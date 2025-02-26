from datasets import load_dataset
from transformers import AutoModelForCausalLM, AutoTokenizer, TrainingArguments, Trainer
import torch
from peft import LoraConfig, get_peft_model

# Load base Mistral-7B model and tokenizer
model_name = "mistralai/Mistral-7B-v0.1"
model = AutoModelForCausalLM.from_pretrained(model_name, torch_dtype=torch.float16)
tokenizer = AutoTokenizer.from_pretrained(model_name)

# Load dataset
dataset = load_dataset("json", data_files="training_data.json")

# Configure LoRA
lora_config = LoraConfig(
    r=16,  # Low-rank parameter
    lora_alpha=32,
    lora_dropout=0.05,
    target_modules=["q_proj", "v_proj"]
)

# Apply LoRA to the model
model = get_peft_model(model, lora_config)

# Define Training Arguments
training_args = TrainingArguments(
    output_dir="./fine_tuned_mistral",
    per_device_train_batch_size=2,
    gradient_accumulation_steps=4,
    num_train_epochs=3,
    save_strategy="epoch",
    logging_dir="./logs"
)

# Trainer
trainer = Trainer(
    model=model,
    args=training_args,
    train_dataset=dataset["train"],
    tokenizer=tokenizer
)

# Start Fine-Tuning
trainer.train()

# Save Fine-Tuned Model
model.save_pretrained("./fine_tuned_mistral")
tokenizer.save_pretrained("./fine_tuned_mistral")
