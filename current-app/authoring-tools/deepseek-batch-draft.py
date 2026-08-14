"""
Batch-draft pending Electricity BBs via DeepSeek, for later human review.
Writes ONLY to a local markdown file - never touches git, never pushes,
never edits ELECTRICITY-DRAFT.js directly. Review and integrate manually.

Usage:
    DEEPSEEK_API_KEY=sk-... python3 deepseek-batch-draft.py
"""
import importlib.util
import datetime

spec = importlib.util.spec_from_file_location("deepseek_helper", "deepseek-helper.py")
mod = importlib.util.module_from_spec(spec)
spec.loader.exec_module(mod)

PENDING_TOPICS = [
    ("EL3", "two kinds of charge exist, positive and negative. Already locked: EL1 (electricity named, energy as a pulse, occurs naturally as lightning), EL2 (electron-drift speed paradox), EL10 (resistance, via wood-vs-metal-coil chemical/physical contrast)."),
    ("EL4", "charges interact by one rule: like charges repel, opposite charges attract. Builds on EL3."),
    ("EL5", "conductors vs insulators - why charge moves freely through some materials and not others. Builds on EL2's free-roaming electrons."),
    ("EL6", "what electric current is - charge in motion. Builds on EL5."),
    ("EL7", "current is measured in amperes, I = Q/t. Builds on EL6. Needs a worked numeric example."),
    ("EL8", "what voltage is - the push behind the flow, potential difference. Builds on EL7."),
    ("EL9-ALTERNATIVE", "IMPORTANT: this BB explains how voltage, current, and resistance relate to each other before Ohm's Law is formally introduced. The author already rejected the water-pipe-and-pump analogy as not working well. Propose a DIFFERENT concrete analogy or approach entirely - do not reuse pipes/water/pumps in any form."),
    ("EL11", "Ohm's Law, V = IR. Builds on EL10 (resistance, already locked) and whatever replaces EL9."),
    ("EL12", "a fully worked numeric example applying Ohm's Law. Builds on EL11."),
    ("EL13", "series circuits - current is the same all the way around the loop. Builds on EL11."),
    ("EL14", "parallel circuits - voltage is the same across every branch. Builds on EL11."),
    ("EL15", "resistors in series simply add. Needs a worked numeric example. Builds on EL13."),
    ("EL16", "resistors in parallel - combined resistance drops below the smallest one, 1/R_total = 1/R1+1/R2+... Needs a worked numeric example. Builds on EL14."),
]

def main():
    timestamp = datetime.datetime.now().strftime("%Y-%m-%d_%H%M")
    out_path = f"deepseek-drafts-electricity-{timestamp}.md"
    with open(out_path, "w", encoding="utf-8") as f:
        f.write(f"# DeepSeek batch drafts - Electricity pending BBs\nGenerated {timestamp}. NOT reviewed, NOT integrated, NOT committed anywhere yet.\n\n")
        for kicker, context in PENDING_TOPICS:
            print(f"Drafting {kicker}...")
            task = f"BB topic: {kicker} - {context}\n\nWrite Instance 1 and Instance 2 for this BB."
            try:
                result = mod.call_deepseek(task)
            except Exception as e:
                result = f"ERROR calling DeepSeek: {e}"
            f.write(f"## {kicker}\n\n{result}\n\n---\n\n")
    print(f"\nDone. All drafts written to {out_path}. Review before integrating anything.")

if __name__ == "__main__":
    main()
