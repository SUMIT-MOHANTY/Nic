from __future__ import annotations

from dataclasses import dataclass


@dataclass(frozen=True)
class TaskDef:
    id: str
    week: int
    day: int
    kind: str  # video | article | call
    title: str
    description: str
    duration_seconds: int
    content_id: str | None = None


@dataclass(frozen=True)
class ContentDef:
    id: str
    title: str
    subtitle: str | None
    blocks: list[dict]


STEP = {
    "id": "first-step",
    "name": "Your Quit Journey",
    "subtitle": "Kicking Smokeless Tobacco",
}

TOTAL_WEEKS = 12
DAYS_IN_WEEK = 7


def _mmss(minutes: int, seconds: int) -> int:
    return minutes * 60 + seconds


TASKS: list[TaskDef] = [
    TaskDef(
        id="w0d1-why-quit",
        week=0,
        day=1,
        kind="video",
        title="Why Quit Smokeless Tobacco?",
        description="Understanding chewable tobacco addiction and how this program will guide you to a cleaner mouth and body.",
        duration_seconds=_mmss(2, 30),
        content_id="c-why-quit",
    ),
    TaskDef(
        id="w0d2-long-term-effects",
        week=0,
        day=2,
        kind="video",
        title="Oral Lesions & Smokeless Tobacco",
        description="Learn about the long-term impact of chewable tobacco (Gutkha, Khaini, Mishri) on oral lining and dental health.",
        duration_seconds=_mmss(4, 15),
        content_id="c-long-term-effects",
    ),
    TaskDef(
        id="w0d3-body-brain",
        week=0,
        day=3,
        kind="article",
        title="Healing the Oral Cavity & Brain",
        description="How your mouth lining starts regenerating and nicotine cravings peak and subside after quitting chewable tobacco.",
        duration_seconds=_mmss(5, 0),
        content_id="c-body-brain",
    ),
    TaskDef(
        id="w0d4-health-benefits",
        week=0,
        day=4,
        kind="article",
        title="Health Benefits of a Pouch-Free Life",
        description="Improved taste, reduced risk of oral submucous fibrosis (OSMF), fresher breath, and significant money saved.",
        duration_seconds=_mmss(5, 0),
        content_id="c-health-benefits",
    ),
    TaskDef(
        id="w0d5-habit-loop",
        week=0,
        day=5,
        kind="video",
        title="Breaking the Chewing Habit Loop",
        description="Chewing is often triggered by routines (after meals, work stress, tea time). Learn to swap the response.",
        duration_seconds=_mmss(1, 1),
        content_id="c-habit-loop",
    ),
    TaskDef(
        id="w0d6-intro-nrt",
        week=0,
        day=6,
        kind="video",
        title="Introduction to Oral Substitutes & Support",
        description="Transitioning to healthy oral substitutes like fennel (saunf), cardamom (elaichi), and clove (laung).",
        duration_seconds=_mmss(1, 46),
        content_id="c-intro-nrt",
    ),
    TaskDef(
        id="w0d6-myths",
        week=0,
        day=6,
        kind="video",
        title="Myths About Gutkha, Khaini & Mishri",
        description="Debunking common beliefs: 'Mishri cleans teeth', 'Gutkha aids digestion', or 'Khaini helps focus'.",
        duration_seconds=_mmss(1, 15),
        content_id="c-myths",
    ),
    TaskDef(
        id="w0d6-taper-down",
        week=0,
        day=6,
        kind="article",
        title="Gradual Tapering vs. Abrupt Quitting",
        description="A simple daily program to reduce your chew count or schedule your abrupt Quit Date.",
        duration_seconds=_mmss(2, 10),
        content_id="c-taper-down",
    ),
    TaskDef(
        id="w0d7-counsellor-connect",
        week=0,
        day=7,
        kind="call",
        title="Connect with a Cessation Expert",
        description="A free 15-minute introductory call with a certified tobacco cessation counselor.",
        duration_seconds=_mmss(1, 2),
        content_id="c-counsellor-connect",
    ),
]


CONTENT: dict[str, ContentDef] = {
    "c-why-quit": ContentDef(
        id="c-why-quit",
        title="Why Quit Smokeless Tobacco?",
        subtitle="Your journey to a healthier mouth",
        blocks=[
            {
                "type": "paragraph",
                "text": "Smokeless tobacco (including Gutkha, Khaini, Mishri, Zarda, and Paan Masala) contains more than 28 cancer-causing chemicals. Quitting is a direct, active step towards saving your oral health, preserving your smile, and preventing oral submucous fibrosis (OSMF).",
            },
            {
                "type": "tips",
                "items": [
                    {
                        "title": "Save Your Smile",
                        "text": "Identify your chew habits—write down your daily count and the brand you buy most.",
                        "icon": "target",
                    },
                    {
                        "title": "Understand the Triggers",
                        "text": "Notice when you reach for a pouch: Is it after lunch? During a tea break? Under stress?",
                        "icon": "spark",
                    },
                ],
            },
        ],
    ),
    "c-long-term-effects": ContentDef(
        id="c-long-term-effects",
        title="Oral Lesions & Smokeless Tobacco",
        subtitle="Identifying early indicators",
        blocks=[
            {
                "type": "paragraph",
                "text": "Frequent contact of tobacco with the mouth tissues leads to chemical burns, thick white patches (leukoplakia), and red patches (erythroplakia). These are precursors to oral cancer. Regular screening and immediate cessation can reverse early mucosal changes.",
            }
        ],
    ),
    "c-body-brain": ContentDef(
        id="c-body-brain",
        title="Healing the Oral Cavity & Brain",
        subtitle="What happens when you stop chewing",
        blocks=[
            {
                "type": "paragraph",
                "text": "Within 48 hours of your last chew, your taste buds regenerate, and the chemical irritation in your cheeks begins to settle down. Within 2 weeks, your heart rate and blood pressure stabilize, and your gums start recovering their natural pink color.",
            }
        ],
    ),
    "c-health-benefits": ContentDef(
        id="c-health-benefits",
        title="Health Benefits of a Pouch-Free Life",
        subtitle="A quick checklist",
        blocks=[
            {
                "type": "paragraph",
                "text": "1. **Increased Jaw Mobility:** Prevent jaw lock and stiffness.\n2. **Oral Hygiene:** No more stains, bad breath, or gum bleeding.\n3. **Financial Savings:** Hundreds of rupees saved every single week.\n4. **Family Health:** Keep your loved ones free from second-hand spit-tobacco exposure.",
            }
        ],
    ),
    "c-habit-loop": ContentDef(
        id="c-habit-loop",
        title="Breaking the Chewing Habit Loop",
        subtitle="Cue → Urge → Chew → Reward",
        blocks=[
            {
                "type": "paragraph",
                "text": "Every chew has a cue. For example: tea break at work (cue) leads to the urge (craving) to chew Gutkha. The chewing action (response) gives a nicotine rush (reward). Break the loop by swapping the response—have a glass of cold water or cardamom instead.",
            }
        ],
    ),
    "c-intro-nrt": ContentDef(
        id="c-intro-nrt",
        title="Introduction to Oral Substitutes & Support",
        subtitle="Keeping your mouth busy safely",
        blocks=[
            {
                "type": "paragraph",
                "text": "Cravings peak for 2-3 minutes. When your hand reaches for a pouch, replace it with:\n- Roasted Fennel (Saunf) mixed with Cardamom (Elaichi)\n- Sugar-free chewing gum or candy\n- Clove (Laung) kept in the side of your cheek\n- A quick deep breathing exercise",
            }
        ],
    ),
    "c-myths": ContentDef(
        id="c-myths",
        title="Myths About Gutkha, Khaini & Mishri",
        subtitle="Fact-checking tobacco beliefs",
        blocks=[
            {
                "type": "paragraph",
                "text": "Myths vs Facts:\n- **Myth:** Mishri is just toasted powder that cleans teeth.\n- **Fact:** Mishri is roasted tobacco powder that causes rapid tooth decay and gum disease.\n- **Myth:** Gutkha aids digestion after spicy meals.\n- **Fact:** Gutkha irritates stomach lining, causes acid reflux, and damages the digestive tract.\n- **Myth:** Khaini helps workers maintain focus.\n- **Fact:** The focus is just temporary relief from nicotine withdrawal. Healthy rest breaks are more effective.",
            }
        ],
    ),
    "c-taper-down": ContentDef(
        id="c-taper-down",
        title="Gradual Tapering vs. Abrupt Quitting",
        subtitle="Choose your pathway",
        blocks=[
            {
                "type": "tips",
                "items": [
                    {
                        "title": "Set a Clear Quit Date",
                        "text": "Pick a memorable day within the next 7 days to quit completely.",
                        "icon": "trigger",
                    },
                    {
                        "title": "Reduce Daily Counts",
                        "text": "If you chew 10 pouches a day, cut down to 8 tomorrow, then 6, tapering to zero.",
                        "icon": "hand",
                    },
                    {
                        "title": "Throw Away Stashes",
                        "text": "Do not keep 'spare' pouches in your pockets, drawer, or car.",
                        "icon": "swap",
                    },
                ],
            }
        ],
    ),
    "c-counsellor-connect": ContentDef(
        id="c-counsellor-connect",
        title="Cessation Expert Call",
        subtitle="15-minute free consultation",
        blocks=[
            {
                "type": "paragraph",
                "text": "Talk to a licensed cessation professional. They will help you handle stressful triggers, discuss nicotine gums if needed, and give you a structured strategy for relapse prevention.",
            }
        ],
    ),
}


LEARN_CARDS = [
    {
        "id": "learn-cravings",
        "title": "Handling Smokeless Cravings",
        "subtitle": "Easy steps to manage the chew urge.",
        "contentId": "c-intro-nrt",
    },
    {
        "id": "learn-breathe",
        "title": "60-Second Mouth & Mind Reset",
        "subtitle": "A breathing routine to keep your mouth busy and relaxed.",
        "contentId": "c-habit-loop",
    },
]
