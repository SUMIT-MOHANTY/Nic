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
    "name": "Your First Step",
    "subtitle": "Benefits of Quitting",
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
        title="Why Quit Smoking?",
        description="This video introduces why quitting matters and what you can expect.",
        duration_seconds=_mmss(2, 30),
        content_id="c-why-quit",
    ),
    TaskDef(
        id="w0d2-long-term-effects",
        week=0,
        day=2,
        kind="video",
        title="What are the long-term effects of Smoking?",
        description="Smoking takes a serious toll on your health over time.",
        duration_seconds=_mmss(4, 15),
        content_id="c-long-term-effects",
    ),
    TaskDef(
        id="w0d3-body-brain",
        week=0,
        day=3,
        kind="article",
        title="Effects of Quitting on the Body & Brain",
        description="Read through how your body starts recovering after you quit.",
        duration_seconds=_mmss(5, 0),
        content_id="c-body-brain",
    ),
    TaskDef(
        id="w0d4-health-benefits",
        week=0,
        day=4,
        kind="article",
        title="What are the Health Benefits of Quitting Smoking?",
        description="Read through the health benefits you’ll notice over time.",
        duration_seconds=_mmss(5, 0),
        content_id="c-health-benefits",
    ),
    TaskDef(
        id="w0d5-habit-loop",
        week=0,
        day=5,
        kind="video",
        title="The Habit Loop",
        description="Habits fuel our addictions, but they can be changed.",
        duration_seconds=_mmss(1, 1),
        content_id="c-habit-loop",
    ),
    TaskDef(
        id="w0d6-intro-nrt",
        week=0,
        day=6,
        kind="video",
        title="Introduction to NRT & Nicotex",
        description="Ready to quit smoking? This video introduces Nicotine Replacement Therapy.",
        duration_seconds=_mmss(1, 46),
        content_id="c-intro-nrt",
    ),
    TaskDef(
        id="w0d6-myths",
        week=0,
        day=6,
        kind="video",
        title="Myths of Nicotex, Smoking & Quitting",
        description="Don’t listen to rumors—learn the right dosage & method.",
        duration_seconds=_mmss(1, 15),
        content_id="c-myths",
    ),
    TaskDef(
        id="w0d6-taper-down",
        week=0,
        day=6,
        kind="article",
        title="How to taper down Nicotex?",
        description="Read through a simple plan to reduce dependence safely.",
        duration_seconds=_mmss(2, 10),
        content_id="c-taper-down",
    ),
    TaskDef(
        id="w0d7-counsellor-connect",
        week=0,
        day=7,
        kind="call",
        title="Counsellor Connect",
        description="Your First Counselling Call Awaits",
        duration_seconds=_mmss(1, 2),
        content_id="c-counsellor-connect",
    ),
]


CONTENT: dict[str, ContentDef] = {
    "c-why-quit": ContentDef(
        id="c-why-quit",
        title="Why Quit Smoking?",
        subtitle="A quick start guide",
        blocks=[
            {
                "type": "paragraph",
                "text": "Quitting is hard, but it’s one of the best decisions for your health and your family. Start small—one day at a time.",
            },
            {
                "type": "tips",
                "items": [
                    {
                        "title": "Pick your reason",
                        "text": "Health, family, finances—write it down and keep it visible.",
                        "icon": "target",
                    },
                    {
                        "title": "Plan your triggers",
                        "text": "Notice when cravings hit and decide what you’ll do instead.",
                        "icon": "spark",
                    },
                ],
            },
        ],
    ),
    "c-long-term-effects": ContentDef(
        id="c-long-term-effects",
        title="Long‑term effects of smoking",
        subtitle="What happens over time",
        blocks=[
            {
                "type": "paragraph",
                "text": "Smoking affects nearly every organ. The good news: your body starts healing soon after you stop.",
            }
        ],
    ),
    "c-body-brain": ContentDef(
        id="c-body-brain",
        title="Effects of quitting on the body & brain",
        subtitle=None,
        blocks=[
            {
                "type": "paragraph",
                "text": "Within days, your circulation improves and carbon monoxide levels normalize. Over weeks and months, breathing becomes easier.",
            }
        ],
    ),
    "c-health-benefits": ContentDef(
        id="c-health-benefits",
        title="Health benefits of quitting",
        subtitle=None,
        blocks=[
            {
                "type": "paragraph",
                "text": "Energy improves, cough reduces, and risks for heart disease and stroke decrease over time.",
            }
        ],
    ),
    "c-habit-loop": ContentDef(
        id="c-habit-loop",
        title="The Habit Loop",
        subtitle="Cue → Craving → Response → Reward",
        blocks=[
            {
                "type": "paragraph",
                "text": "Spot the cue and replace the response with a healthier routine—walk, water, breathing, or a quick chat.",
            }
        ],
    ),
    "c-intro-nrt": ContentDef(
        id="c-intro-nrt",
        title="Introduction to NRT & Nicotex",
        subtitle=None,
        blocks=[
            {
                "type": "paragraph",
                "text": "Nicotine Replacement Therapy can help reduce cravings while you break the behavioral habit of smoking.",
            }
        ],
    ),
    "c-myths": ContentDef(
        id="c-myths",
        title="Myths of Nicotex, smoking & quitting",
        subtitle=None,
        blocks=[
            {
                "type": "paragraph",
                "text": "Use the right dosage and the right method. Avoid self‑diagnosis—get guidance when needed.",
            }
        ],
    ),
    "c-taper-down": ContentDef(
        id="c-taper-down",
        title="How to taper down Nicotex?",
        subtitle=None,
        blocks=[
            {
                "type": "tips",
                "items": [
                    {
                        "title": "Recognise triggers",
                        "text": "Relapse often starts with exposure to triggers—parties or places where you used to smoke. Avoid these whenever possible.",
                        "icon": "trigger",
                    },
                    {
                        "title": "Wait out cravings",
                        "text": "Distract yourself for 30 minutes when cravings hit; they often lessen with time.",
                        "icon": "hand",
                    },
                    {
                        "title": "Replace negative routines",
                        "text": "Find positive activities to fill your time, rather than falling back into old habits.",
                        "icon": "swap",
                    },
                ],
            }
        ],
    ),
    "c-counsellor-connect": ContentDef(
        id="c-counsellor-connect",
        title="Counsellor Connect",
        subtitle="Free 45 mins call with expert",
        blocks=[
            {
                "type": "paragraph",
                "text": "Enjoy your free 7‑day trial, available once for new users to experience your personalised quit journey.",
            }
        ],
    ),
}


LEARN_CARDS = [
    {
        "id": "learn-cravings",
        "title": "When cravings strikes",
        "subtitle": "Here’s what helps when the urge kicks in.",
        "contentId": "c-taper-down",
    },
    {
        "id": "learn-breathe",
        "title": "60‑second reset",
        "subtitle": "A quick breathing routine to reduce cravings.",
        "contentId": "c-habit-loop",
    },
]

