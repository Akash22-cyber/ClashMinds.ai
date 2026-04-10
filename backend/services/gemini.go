package services

import (
	"context"
	"errors"
	"strings"

	"google.golang.org/genai"
)

const defaultGeminiModel = "gemini-2.5-flash"

func initGemini(apiKey string) (*genai.Client, error) {
	config := &genai.ClientConfig{}
	if apiKey != "" {
		config.APIKey = apiKey
	}
	return genai.NewClient(context.Background(), config)
}

func generateModelText(ctx context.Context, modelName, prompt string) (string, error) {
	if geminiClient == nil {
		return "", errors.New("gemini client not initialized")
	}

	config := &genai.GenerateContentConfig{
		// Default safety settings are used here, as BlockNone requires special API key permissions
		// and will throw a 400 Bad Request error on standard free-tier keys.
	}

	resp, err := geminiClient.Models.GenerateContent(ctx, defaultGeminiModel, genai.Text(prompt), config)
	if err != nil {
		return "", err
	}
	return cleanModelOutput(resp.Text()), nil
}

func cleanModelOutput(text string) string {
	cleaned := strings.TrimSpace(text)
	cleaned = strings.TrimPrefix(cleaned, "```json")
	cleaned = strings.TrimPrefix(cleaned, "```JSON")
	cleaned = strings.TrimPrefix(cleaned, "```")
	cleaned = strings.TrimSuffix(cleaned, "```")
	return strings.TrimSpace(cleaned)
}

func generateDefaultModelText(ctx context.Context, prompt string) (string, error) {
	return generateModelText(ctx, defaultGeminiModel, prompt)
}
