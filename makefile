# Default target
.DEFAULT_GOAL := help

# Configurable vars
YARN ?= yarn
GIT_USER ?= $(shell git config user.name)
USE_SSH ?= false
BROWSER ?= none

##@ Meta

.PHONY: help
help: ## Display this help.
	@awk 'BEGIN {FS = ":.*##"; printf "\nUsage:\n  make \033[36m<target>\033[0m [script]\033[0m\n"} \
	/^[a-zA-Z_0-9-]+:.*?##/ { printf "  \033[36m%-20s\033[0m %s\n", $$1, $$2 } \
	/^##@/ { printf "\n\033[1m%s\033[0m\n", substr($$0, 5) } ' $(MAKEFILE_LIST)

.PHONY: scripts
scripts: ## List all scripts in package.json
	@echo "📜 Available package.json scripts:" && \
	sed -n '/"scripts"\s*:/,/^[ \t]*}/p' package.json | \
	grep -E '^\s*"[^"]+"\s*:\s*"[^"]+"' | \
	sed -E 's/^\s*"([^"]+)"\s*:\s*"([^"]+)",?\s*$$/\1|\2/' | \
	awk -F'|' '{ printf "  \033[36m%-20s\033[0m %s\n", $$1, $$2 }'


##@ Dependency Management

.PHONY: install-yarn
install-yarn: ## Install Yarn globally via npm
	@echo "📦 Installing Yarn globally with npm..."
	@if command -v npm >/dev/null 2>&1; then \
		npm install -g yarn; \
	else \
		echo "❌ npm is not available. Please install Node.js first."; \
		exit 1; \
	fi

.PHONY: install
install: ## Install dependencies via Yarn
	@echo "📦 Installing dependencies..."
	$(YARN)

.PHONY: prune
prune: ## Remove node_modules and Yarn cache
	@echo "🧼 Removing node_modules and Yarn cache..."
	@rm -rf node_modules
	@$(YARN) cache clean

##@ Development

.PHONY: dev
dev: ## Start the local development server (BROWSER=none by default)
	@echo "🧪 Starting dev server with BROWSER=$(BROWSER)..."
	BROWSER=$(BROWSER) $(YARN) start

.PHONY: build
build: ## Build the static site
	@echo "🏗️  Building site..."
	$(YARN) build

.PHONY: clean
clean: ## Remove the build output directory
	@echo "🧹 Cleaning up build artifacts..."
	@rm -rf build

##@ Deployment

.PHONY: deploy
deploy: ## Deploy the site (via SSH or GitHub username)
	@echo "🚀 Deploying site..."
ifeq ($(USE_SSH),true)
	USE_SSH=true $(YARN) deploy
else
	GIT_USER=$(GIT_USER) $(YARN) deploy
endif

##@ Script Runner

.PHONY: yarn
yarn: ## Run a script from package.json. Falls back to 'make scripts' if none or invalid.
	@script="$(filter-out $@, $(MAKECMDGOALS))"; \
	if [ -z "$$script" ]; then \
		echo "❌ No script provided."; \
		$(MAKE) scripts; \
		exit 1; \
	fi; \
	if grep -q "\"$$script\"[[:space:]]*:" package.json; then \
		echo "▶️  Running: yarn $$script"; \
		$(YARN) $$script; \
	else \
		echo "❌ Script '$$script' not found in package.json."; \
		$(MAKE) scripts; \
		exit 1; \
	fi




# Catch-all to allow `make yarn <script>`
%:
	@:
