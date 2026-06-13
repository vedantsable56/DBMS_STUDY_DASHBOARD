import os
import re

def clean_content(content):
    # 1. Replace \overline{TEXT} with combining overline
    def replace_overline(match):
        text = match.group(1)
        return "".join(c + "\u0305" for c in text)
    
    content = re.sub(r'\\overline\{([^\}]+)\}', replace_overline, content)
    
    # 2. Replace \frac{NUM}{DEN} with NUM/DEN
    content = re.sub(r'\\frac\{([^\}]+)\}\{([^\}]+)\}', r'\1/\2', content)
    
    # 3. Replace \text{TEXT} with TEXT
    content = re.sub(r'\\text\{([^\}]+)\}', r'\1', content)
    
    # 4. Replace \mathbf{TEXT} with TEXT
    content = re.sub(r'\\mathbf\{([^\}]+)\}', r'\1', content)
    
    # 5. Math symbols replacements
    replacements = [
        (r'\cdot', '·'),
        (r'\oplus', '⊕'),
        (r'\leftarrow', '←'),
        (r'\rightarrow', '→'),
        (r'\pm', '±'),
        (r'\times', '×'),
        (r'\approx', '≈'),
        (r'\bmod', 'mod'),
        (r'\Sigma', 'Σ'),
        (r'\le', '≤'),
        (r'\ge', '≥'),
    ]
    
    for pattern, replacement in replacements:
        content = content.replace(pattern, replacement)
        content = content.replace(pattern.replace('\\', '\\\\'), replacement)

    # 6. Remove double dollars for block math equations
    content = re.sub(r'\$\$(.*?)\$\$', r'\1', content, flags=re.DOTALL)
    
    # 7. Remove single dollar signs around inline math
    content = re.sub(r'\$([^\$\n]+)\$', r'\1', content)
    
    return content

def main():
    directory = "."
    for filename in os.listdir(directory):
        if filename.endswith(".md") and "Unit_" in filename:
            filepath = os.path.join(directory, filename)
            print(f"Cleaning LaTeX in {filename}...")
            with open(filepath, 'r', encoding='utf-8') as f:
                content = f.read()
                
            cleaned = clean_content(content)
            
            with open(filepath, 'w', encoding='utf-8') as f:
                f.write(cleaned)

if __name__ == '__main__':
    main()
