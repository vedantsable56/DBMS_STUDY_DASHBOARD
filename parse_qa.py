import os
import re
import json
import glob

def parse_md_file(filepath):
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    # Find the unit number and title
    # e.g., "# DBMS: Unit I — Introduction to Database Management System (Q&A)"
    # Also matches: "# DBMS Unit IV — Database Transactions (Exam-Ready SPPU Answers)"
    unit_match = re.search(
        r'^#\s+DBMS:?\s*Unit\s+([IVXLCDM\d]+)[—\-\s\–]+(.*?)(?:\s*\((?:Q&A|Q\s*&\s*A|Exam[^)]*)\))?(?:\s*\((?:Q&A|Q\s*&\s*A|Exam[^)]*)\))?\s*$', 
        content, 
        re.MULTILINE
    )
    unit_str = "Unknown"
    unit_title = "Unknown"
    if unit_match:
        unit_str = unit_match.group(1).strip()
        unit_title = unit_match.group(2).strip()
    
    # Map Roman numerals to digits
    roman_map = {"I": 1, "II": 2, "III": 3, "IV": 4, "V": 5, "VI": 6}
    unit_num = roman_map.get(unit_str, unit_str)
    try:
        unit_num = int(unit_num)
    except ValueError:
        unit_num = 0  # Fallback to 0 to avoid sort errors

    # Find all question headings
    # format: "## Q1. Question text... (7 Marks)"
    pattern = r'^##\s+Q(\d+)\.\s*(.*?)$'
    matches = list(re.finditer(pattern, content, re.MULTILINE))
    
    questions = []
    for i in range(len(matches)):
        start_pos = matches[i].end()
        end_pos = matches[i+1].start() if i + 1 < len(matches) else len(content)
        
        q_num = int(matches[i].group(1))
        q_header = matches[i].group(2).strip()
        
        # Try to extract marks from header, e.g., "... (7 Marks)" or "... [8 Marks]"
        marks_match = re.search(r'[\(\[]\s*(\d+)\s*Marks?\s*[\)\]]', q_header)
        marks = None
        q_text = q_header
        if marks_match:
            marks = int(marks_match.group(1))
            # strip out the marks part from the question text
            q_text = re.sub(r'\s*[\(\[]\s*\d+\s*Marks?\s*[\)\]]\s*$', '', q_header).strip()
            
        ans_md = content[start_pos:end_pos].strip()
        
        # Clean up leading horizontal rules or trailing horizontal rules in the answer
        if ans_md.startswith('---'):
            ans_md = ans_md[3:].strip()
        if ans_md.endswith('---'):
            ans_md = ans_md[:-3].strip()
        if ans_md.endswith('---'):
            ans_md = ans_md[:-3].strip()
            
        questions.append({
            "id": f"dbms_q{q_num}_u{unit_num}",
            "number": q_num,
            "question": q_text,
            "marks": marks,
            "answer": ans_md
        })
        
    return {
        "unitNum": unit_num,
        "unitTitle": unit_title,
        "questions": questions
    }

def main():
    base_dir = "."
    output_dir = "./data"
    os.makedirs(output_dir, exist_ok=True)
    
    files = glob.glob(os.path.join(base_dir, "Unit_*_QA.md"))
    units = []
    for f in files:
        print(f"Parsing {f}...")
        try:
            unit_data = parse_md_file(f)
            units.append(unit_data)
        except Exception as e:
            print(f"Error parsing {f}: {e}")
            
    # Sort units by unitNum
    units.sort(key=lambda x: x["unitNum"])
    
    subject_data = {
        "subjectId": "dbms",
        "subjectName": "Database Management Systems",
        "units": units
    }
    
    output_file = os.path.join(output_dir, "dbms.js")
    with open(output_file, 'w', encoding='utf-8') as out:
        out.write("const dbms_data = ")
        json.dump(subject_data, out, indent=2, ensure_ascii=False)
        out.write(";\n")
        
    print(f"Successfully generated {output_file}")

if __name__ == '__main__':
    main()
