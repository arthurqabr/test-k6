.PHONY: test

test:
    find scripts -name "*.js" | xargs -I {} k6 run {}
