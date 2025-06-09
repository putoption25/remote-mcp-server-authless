import { McpAgent } from "agents/mcp";
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";

// Enhanced mock student data with realistic classroom complexity
const mockStudentData = {
  lessonId: "LU057",
  lessonTitle: "Understanding capacity and volume",
  classId: "3B",
  teacherName: "Ms. Rodriguez",
  schoolName: "Oakfield Primary",
  lessonDate: "2024-11-15",
  
  // Class composition reflecting real diversity
  totalStudents: 26,
  completed: 24,
  inProgress: 1,
  absent: 1,
  averageScore: 76,
  averageTime: 32, // minutes
  expectedTime: 30, // planned lesson time
  
  // National Curriculum alignment
  curriculumObjectives: {
    "NC.Y3.M.6a": { title: "Measure, compare, add and subtract: lengths (m/cm/mm), mass (kg/g), volume/capacity (l/ml)", achieved: 18, total: 24, percentage: 75 },
    "NC.Y3.M.6b": { title: "Compare different quantities using <, > and = symbols", achieved: 21, total: 24, percentage: 88 },
    "NC.Y3.M.6c": { title: "Use vocabulary of capacity and volume", achieved: 16, total: 24, percentage: 67 }
  },
  
  // Deep concept performance with error analysis
  conceptPerformance: {
    "capacity-definition": { 
      correct: 19, total: 24, percentage: 79,
      commonErrors: ["Used 'volume' and 'capacity' interchangeably", "Thought capacity changes with liquid level"],
      nextSteps: ["Concrete demonstrations with identical containers, different fill levels"]
    },
    "volume-measurement": { 
      correct: 16, total: 24, percentage: 67,
      commonErrors: ["Misread scale graduations", "Counted marks instead of reading values", "Rounded inappropriately"],
      nextSteps: ["Hands-on measuring with real jugs", "Scale reading practice with peer support"]
    },
    "capacity-comparison": { 
      correct: 20, total: 24, percentage: 83,
      commonErrors: ["Visual estimation errors", "Confused height with volume"],
      nextSteps: ["Practical pouring activities", "Use containers of different shapes"]
    },
    "millilitre-calculations": { 
      correct: 14, total: 24, percentage: 58,
      commonErrors: ["Place value errors (500+400=800)", "Addition/subtraction mistakes", "Unit confusion"],
      nextSteps: ["Number line work with 100s", "Mental maths intervention group", "Place value revision"]
    }
  },
  
  // Detailed student profiles with learning stories
  studentProfiles: [
    { 
      id: "S001", name: "Amara Hassan", score: 67, time: 28, 
      background: "EAL - Arabic L1, joined in Y2",
      strengths: ["Visual-spatial reasoning", "Practical understanding"], 
      struggles: ["Academic vocabulary", "Word problem comprehension"],
      notes: "Correctly identified capacity vs volume concepts but struggled with written explanations. Strong mathematical thinking evident.",
      intervention: "Pre-teach vocabulary, visual supports, peer translation support",
      curriculumLevel: "Working towards expected"
    },
    { 
      id: "S002", name: "James Mitchell", score: 45, time: 40, 
      background: "SEN - Dyslexia, working memory difficulties",
      strengths: ["Hands-on learning", "Persistence", "Peer relationships"], 
      struggles: ["Multi-step problems", "Reading scales", "Written calculations"],
      notes: "Showed excellent understanding during practical demonstration but struggled with abstract questions. Made 3 attempts on difficult questions showing resilience.",
      intervention: "Concrete manipulatives, step-by-step visual guides, reduced cognitive load",
      curriculumLevel: "Working below expected, making progress"
    },
    { 
      id: "S003", name: "Priya Patel", score: 94, time: 18, 
      background: "High achiever, confident mathematician",
      strengths: ["Quick processing", "Pattern recognition", "Peer teaching"], 
      struggles: ["Explaining reasoning to others"],
      notes: "Completed all questions accurately and helped 3 classmates. Ready for extension work with decimal measurements.",
      intervention: "Extension activities with 1.5L=1500ml, peer mentoring role",
      curriculumLevel: "Exceeding expected"
    },
    { 
      id: "S004", name: "Oliver Thompson", score: 38, time: 45, 
      background: "Persistent learning needs, requires intervention",
      strengths: ["Effort", "Asks for help appropriately"], 
      struggles: ["Number sense", "All mathematical concepts", "Working memory"],
      notes: "Struggled with basic addition of 2-digit numbers. Showed improvement from previous lesson (25% to 38%). Needs significant support.",
      intervention: "1:1 TA support, concrete materials, basic number work first",
      curriculumLevel: "Working significantly below expected"
    },
    { 
      id: "S005", name: "Charlotte Williams", score: 88, time: 25, 
      background: "Consistent high performer",
      strengths: ["Systematic approach", "Clear explanations", "Mathematical vocabulary"], 
      struggles: ["Occasional calculation errors under time pressure"],
      notes: "Strong conceptual understanding. Made one arithmetic error but self-corrected. Could support struggling peers.",
      intervention: "Peer tutoring opportunities, proof-reading strategies",
      curriculumLevel: "Exceeding expected"
    },
    { 
      id: "S006", name: "Marcus Johnson", score: 72, time: 30,
      background: "Generally confident, inconsistent performance",
      strengths: ["Problem-solving", "Collaborative work"],
      struggles: ["Reading scales accurately", "Attention to detail"],
      notes: "Good conceptual grasp but made errors reading measurement scales. Benefited from working with Charlotte.",
      intervention: "Scale reading practice, attention strategies",
      curriculumLevel: "Working towards expected"
    }
    // Additional 20 students would follow similar detailed patterns...
  ],
  
  // Detailed error analysis with examples
  specificErrors: [
    {
      error: "Capacity/Volume Confusion",
      frequency: 8,
      questions: ["EQ3", "SQ1"],
      examples: ["Said jug capacity was 600ml when it contained 600ml", "Thought capacity changes when liquid is poured out"],
      students: ["Amara Hassan", "Marcus Johnson", "Oliver Thompson"],
      remediation: "Physical demonstration: same jug, different fill levels, capacity stays 1000ml"
    },
    {
      error: "Scale Reading - Off by 50ml", 
      frequency: 6,
      questions: ["SQ3", "EQ2", "EQ4"],
      examples: ["Read 750ml as 700ml", "Read 350ml as 400ml"],
      students: ["James Mitchell", "Marcus Johnson"],
      remediation: "Practice with real measuring jugs, point to each graduation mark"
    },
    {
      error: "Place Value in Addition",
      frequency: 9,
      questions: ["SQ5", "EQ5", "EQ6"],
      examples: ["500 + 400 = 800", "300 + 250 = 450"],
      students: ["Oliver Thompson", "Amara Hassan", "James Mitchell"],
      remediation: "Place value charts, number line jumps, concrete representations"
    }
  ],
  
  // Teaching effectiveness insights
  lessonEffectiveness: {
    plannedDuration: 30,
    actualDuration: 35,
    sectionsOverTime: ["Starter assessment took 12 min (planned 8)", "Exit assessment rushed"],
    engagementIndicators: {
      questionsAsked: 23,
      helpRequests: 15,
      peerCollaborations: 8,
      offTask: 3
    },
    resourceUsage: {
      physicalMeasuringJugs: "High engagement, all students participated",
      digitalQuiz: "Some technical issues for 2 students", 
      worksheets: "Not used due to time constraints"
    }
  },
  
  // Tomorrow's grouping recommendations
  recommendedGroups: {
    "Scale Reading Practice": {
      students: ["James Mitchell", "Marcus Johnson", "Oliver Thompson", "Amara Hassan"],
      activity: "Physical measuring with 100ml, 250ml, 500ml, 1L containers",
      resources: "Measuring jugs set, colored water, recording sheet",
      support: "TA support, peer buddies"
    },
    "Millilitre Calculations": {
      students: ["Oliver Thompson", "Tyler Evans", "Emma Roberts"],
      activity: "Number line work 0-1000ml, place value with manipulatives", 
      resources: "1000-bead strings, place value charts, mini whiteboards",
      support: "Concrete before abstract, step-by-step modeling"
    },
    "Extension - Decimal Measurements": {
      students: ["Priya Patel", "Charlotte Williams", "Sophie Chen"],
      activity: "1.5L = 1500ml conversions, real-world problem solving",
      resources: "Challenge cards, 2L bottles, calculators for checking",
      support: "Independent work, peer discussion"
    },
    "Vocabulary Development": {
      students: ["Amara Hassan", "Lucas Garcia", "Fatima Al-Rashid"],
      activity: "Capacity vs volume sorting, definition matching with visuals",
      resources: "Picture cards, definition strips, practical containers", 
      support: "EAL support, home language connections"
    }
  }
};

// Define our MCP agent with comprehensive student analytics tools
export class MyMCP extends McpAgent {
  server = new McpServer({
    name: "Student Analytics",
    version: "1.0.0",
  });

  async init() {
    // Enhanced lesson overview with curriculum alignment
    this.server.tool(
      "get_lesson_analytics",
      { 
        includeTimings: z.boolean().optional(),
        includeCurriculum: z.boolean().optional()
      },
      async ({ includeTimings = true, includeCurriculum = true }) => {
        const data = mockStudentData;
        
        let result = `📊 LESSON ANALYTICS: ${data.lessonTitle}
Class ${data.classId} | ${data.lessonDate} | ${data.teacherName}

🎯 COMPLETION STATUS:
• Students: ${data.completed}/${data.totalStudents} completed (${Math.round(data.completed/data.totalStudents*100)}%)
• Absent: ${data.absent} student(s)
• Average Score: ${data.averageScore}% (Target: 70%+)
• Average Time: ${data.averageTime}min (Planned: ${data.expectedTime}min)

📈 CONCEPT MASTERY:
• Capacity Definition: ${data.conceptPerformance["capacity-definition"].percentage}% 
• Volume Measurement: ${data.conceptPerformance["volume-measurement"].percentage}% ⚠️
• Capacity Comparison: ${data.conceptPerformance["capacity-comparison"].percentage}%
• Millilitre Calculations: ${data.conceptPerformance["millilitre-calculations"].percentage}% 🚨

🎯 PRIORITY ACTIONS:
1. Millilitre calculations need immediate intervention (58% success)
2. Scale reading practice required for 6 students
3. Plan hands-on measuring activities for tomorrow`;

        if (includeCurriculum) {
          result += `\n\n📋 NATIONAL CURRICULUM PROGRESS:
${Object.entries(data.curriculumObjectives).map(([code, obj]) => 
            `• ${code}: ${obj.percentage}% (${obj.achieved}/${obj.total})\n  "${obj.title}"`
          ).join('\n')}`;
        }

        if (includeTimings) {
          result += `\n\n⏱️ LESSON TIMING ANALYSIS:
• Total Duration: ${data.lessonEffectiveness.actualDuration}min (planned ${data.lessonEffectiveness.plannedDuration}min)
• Over-runs: ${data.lessonEffectiveness.sectionsOverTime.join(', ')}
• Engagement: ${data.lessonEffectiveness.engagementIndicators.questionsAsked} questions asked, ${data.lessonEffectiveness.engagementIndicators.helpRequests} help requests`;
        }

        return { content: [{ type: "text", text: result }] };
      }
    );

    // Specific error analysis with remediation strategies
    this.server.tool(
      "get_error_analysis",
      { 
        errorType: z.string().optional()
      },
      async ({ errorType }) => {
        const errors = mockStudentData.specificErrors;
        
        if (errorType) {
          const error = errors.find(e => e.error.toLowerCase().includes(errorType.toLowerCase()));
          if (!error) return { content: [{ type: "text", text: "Error type not found" }] };
          
          const analysis = `🔍 ERROR ANALYSIS: ${error.error}

📊 FREQUENCY: ${error.frequency} students affected
❓ QUESTIONS: ${error.questions.join(', ')}

📝 SPECIFIC EXAMPLES:
${error.examples.map(ex => `• "${ex}"`).join('\n')}

👥 STUDENTS AFFECTED:
${error.students.join(', ')}

💡 REMEDIATION STRATEGY:
${error.remediation}

📚 RESOURCES NEEDED:
• Physical measuring containers
• Visual comparison charts  
• Peer support pairings`;

          return { content: [{ type: "text", text: analysis }] };
        }

        // Show all errors summary
        const summary = `🧠 COMMON ERRORS IDENTIFIED:

${errors.map((error, i) => 
          `${i+1}. ${error.error} (${error.frequency} students)
   Examples: ${error.examples[0]}
   Fix: ${error.remediation}`
        ).join('\n\n')}

🎯 PRIORITY ORDER:
1. Place Value in Addition (9 students) - Most urgent
2. Capacity/Volume Confusion (8 students) - Conceptual issue  
3. Scale Reading Errors (6 students) - Skills practice needed`;

        return { content: [{ type: "text", text: summary }] };
      }
    );

    // Tomorrow's teaching groups with specific activities
    this.server.tool(
      "get_grouping_suggestions",
      { 
        groupName: z.string().optional(),
        includeResources: z.boolean().optional()
      },
      async ({ groupName, includeResources = true }) => {
        const groups = mockStudentData.recommendedGroups;
        
        if (groupName) {
          const group = groups[groupName] || Object.values(groups).find(g => 
            g.students.some(s => s.toLowerCase().includes(groupName.toLowerCase()))
          );
          
          if (!group) return { content: [{ type: "text", text: "Group not found" }] };
          
          let result = `👥 GROUP: ${Object.keys(groups).find(key => groups[key] === group)}

🎯 STUDENTS (${group.students.length}):
${group.students.join(', ')}

📚 ACTIVITY:
${group.activity}

⏱️ DURATION: 15-20 minutes

🎯 LEARNING FOCUS:
${group.activity.includes('measuring') ? 'Practical measurement skills and scale reading' :
  group.activity.includes('calculations') ? 'Mental maths and place value understanding' :
  group.activity.includes('vocabulary') ? 'Mathematical vocabulary and concept clarification' :
  'Advanced problem-solving and reasoning'}`;

          if (includeResources) {
            result += `\n\n📦 RESOURCES REQUIRED:
${group.resources}

👨‍🏫 SUPPORT STRATEGY:
${group.support}`;
          }

          return { content: [{ type: "text", text: result }] };
        }

        // Show all groups summary
        const summary = `📋 TOMORROW'S RECOMMENDED GROUPS:

${Object.entries(groups).map(([name, group]) =>
          `${name.includes('Scale') ? '🔍' : name.includes('Calculations') ? '🧮' : name.includes('Extension') ? '🌟' : '📚'} ${name.toUpperCase()}
Students: ${group.students.slice(0, 2).join(', ')}${group.students.length > 2 ? ` +${group.students.length - 2} more` : ''}
Focus: ${group.activity.split(',')[0]}`
        ).join('\n\n')}

💡 GROUPING RATIONALE:
• Mixed-ability for peer support
• Targeted intervention for common errors
• Extension opportunities for high achievers
• EAL support integrated naturally`;

        return { content: [{ type: "text", text: summary }] };
      }
    );

    // National Curriculum progress tracking
    this.server.tool(
      "get_curriculum_progress",
      { 
        studentName: z.string().optional(),
        objectiveCode: z.string().optional()
      },
      async ({ studentName, objectiveCode }) => {
        const objectives = mockStudentData.curriculumObjectives;
        const students = mockStudentData.studentProfiles;
        
        if (objectiveCode) {
          const obj = objectives[objectiveCode];
          if (!obj) return { content: [{ type: "text", text: "Objective not found" }] };
          
          const result = `📋 CURRICULUM OBJECTIVE: ${objectiveCode}

📖 DESCRIPTION:
"${obj.title}"

📊 CLASS PROGRESS:
• Achieved: ${obj.achieved}/${obj.total} students (${obj.percentage}%)
• At Risk: ${obj.total - obj.achieved} students need intervention

🎯 YEAR 3 EXPECTATION:
${obj.percentage >= 80 ? '✅ Class exceeding expectation' :
  obj.percentage >= 70 ? '⚠️ Most students on track, some intervention needed' :
  '🚨 Significant intervention required'}

📚 NEXT STEPS:
${obj.percentage < 70 ? '• Reteach with concrete materials\n• Increase practice opportunities\n• Consider prerequisite skills gaps' :
  '• Consolidation activities\n• Extension for high achievers\n• Peer tutoring opportunities'}`;

          return { content: [{ type: "text", text: result }] };
        }

        if (studentName) {
          const student = students.find(s => s.name.toLowerCase().includes(studentName.toLowerCase()));
          if (!student) return { content: [{ type: "text", text: "Student not found" }] };
          
          const result = `👤 CURRICULUM PROGRESS: ${student.name}

📊 CURRENT LEVEL: ${student.curriculumLevel}

📈 CAPACITY & VOLUME PERFORMANCE:
• Overall Score: ${student.score}% 
• Curriculum Expectations: ${student.curriculumLevel.includes('Exceeding') ? 'Above' : 
                                   student.curriculumLevel.includes('towards') ? 'Approaching' : 
                                   'Below'} Year 3 standard

💪 STRENGTHS:
${student.strengths && student.strengths.length > 0 ? student.strengths.map(s => `• ${s}`).join('\n') : '• Needs more practice across all areas'}

🎯 DEVELOPMENT AREAS:
${student.struggles && student.struggles.length > 0 ? student.struggles.map(s => `• ${s}`).join('\n') : '• Strong across all concepts'}

📝 TEACHER NOTES:
${student.notes}

📚 NEXT STEPS:
${student.intervention}`;

          return { content: [{ type: "text", text: result }] };
        }

        // Overall curriculum summary
        const summary = `📋 YEAR 3 MATHS: Capacity & Volume Unit

${Object.entries(objectives).map(([code, obj]) =>
          `📌 ${code}: ${obj.percentage}% achieved
"${obj.title}"
${obj.percentage >= 80 ? '✅ Strong progress' : obj.percentage >= 70 ? '⚠️ On track' : '🚨 Needs focus'}`
        ).join('\n\n')}

🎯 UNIT SUMMARY:
• Ready to move on: ${students.filter(s => s.curriculumLevel.includes('Exceeding')).length} students
• Need consolidation: ${students.filter(s => s.curriculumLevel.includes('towards')).length} students  
• Require intervention: ${students.filter(s => s.curriculumLevel.includes('below')).length} students

📚 RECOMMENDED ACTIONS:
• Hands-on measuring activities for concrete understanding
• Mental maths intervention for calculation confidence
• Vocabulary support for EAL learners`;

        return { content: [{ type: "text", text: summary }] };
      }
    );

    // Enhanced individual student performance with learning story
    this.server.tool(
      "get_student_performance", 
      {
        studentName: z.string().optional(),
        includeInterventions: z.boolean().optional()
      },
      async ({ studentName, includeInterventions = true }) => {
        const students = mockStudentData.studentProfiles;
        
        if (!studentName) {
          const summary = `🏆 CLASS PERFORMANCE OVERVIEW:

📊 DISTRIBUTION:
• Exceeding (80%+): ${students.filter(s => s.score >= 80).length} students
• Meeting (60-79%): ${students.filter(s => s.score >= 60 && s.score < 80).length} students  
• Below (40-59%): ${students.filter(s => s.score >= 40 && s.score < 60).length} students
• Significant Need (<40%): ${students.filter(s => s.score < 40).length} students

🌟 TOP PERFORMERS:
${students.sort((a,b) => b.score - a.score).slice(0, 3).map((s, i) => `${i+1}. ${s.name}: ${s.score}%`).join('\n')}

⚠️ NEEDS SUPPORT:
${students.sort((a,b) => a.score - b.score).slice(0, 3).map(s => `• ${s.name}: ${s.score}% - ${s.struggles && s.struggles[0] ? s.struggles[0] : 'Multiple areas'}`).join('\n')}`;

          return { content: [{ type: "text", text: summary }] };
        }

        const student = students.find(s => s.name.toLowerCase().includes(studentName.toLowerCase()));
        if (!student) {
          return { content: [{ type: "text", text: "Student not found. Try: Amara, James, Priya, Oliver, Charlotte, or Marcus" }] };
        }

        let report = `👤 DETAILED REPORT: ${student.name}

📊 PERFORMANCE SUMMARY:
• Score: ${student.score}% (Class avg: ${mockStudentData.averageScore}%)
• Time: ${student.time} minutes (Class avg: ${mockStudentData.averageTime}min)
• Curriculum Level: ${student.curriculumLevel}

👥 BACKGROUND:
${student.background}

💪 STRENGTHS:
${student.strengths.map(s => `• ${s}`).join('\n')}

🎯 DEVELOPMENT AREAS:
${student.struggles.map(s => `• ${s}`).join('\n')}

📝 LEARNING STORY:
${student.notes}`;

        if (includeInterventions) {
          report += `\n\n📚 RECOMMENDED INTERVENTIONS:
${student.intervention}

🎯 SUCCESS CRITERIA:
${student.score >= 80 ? '• Maintain high standards\n• Extend learning with decimal measurements\n• Support struggling peers' :
  student.score >= 60 ? '• Improve calculation accuracy to 80%+\n• Develop scale reading confidence\n• Practice mathematical vocabulary' :
  '• Build number sense foundations\n• Use concrete materials consistently\n• Small-step progression with celebration'}`;
        }

        return { content: [{ type: "text", text: report }] };
      }
    );

    // Practical insights for hands-on learning
    this.server.tool(
      "get_practical_insights",
      { 
        focus: z.enum(["resources", "accessibility", "engagement"]).optional()
      },
      async ({ focus }) => {
        const data = mockStudentData;
        
        if (focus === "resources") {
          const result = `📦 RESOURCE RECOMMENDATIONS:

🥤 MEASURING CONTAINERS:
• Priority: 100ml, 250ml, 500ml, 1L transparent jugs
• Students needing hands-on: James, Oliver, Marcus, Amara (+ 4 others)
• Activity: Capacity vs volume demonstrations

🎯 MANIPULATIVES NEEDED:
• Place value charts for millilitre calculations (9 students)
• Number lines 0-1000ml (6 students)  
• Colored water for visual measurement
• Recording sheets with visual supports

💻 TECHNOLOGY:
• 2 students had technical issues with digital quiz
• Consider paper backup for James (screen reading difficulties)
• Interactive whiteboard for scale reading demonstrations

📚 DIFFERENTIATION MATERIALS:
• EAL picture cards for Amara, Lucas, Fatima
• Step-by-step visual guides for James
• Extension challenge cards for Priya, Charlotte, Sophie`;

          return { content: [{ type: "text", text: result }] };
        }

        if (focus === "accessibility") {
          const result = `♿ ACCESSIBILITY & INCLUSION:

🗣️ EAL SUPPORT:
• 3 students need vocabulary pre-teaching: Amara, Lucas, Fatima
• Provide visual definitions for 'capacity', 'volume', 'millilitre'
• Consider home language connections for key concepts

🧠 SEN ACCOMMODATIONS:
• James (Dyslexia): Larger fonts, reduced text, verbal instructions
• Oliver (Working memory): Break tasks into steps, provide checklists
• Visual learners: Use color-coding for different measurement units

⏱️ TIME ADJUSTMENTS:
• 3 students need extra time: James (40min), Oliver (45min)
• Consider pre-teaching key vocabulary day before
• Allow movement breaks for kinesthetic learners

🤝 PEER SUPPORT:
• Successful pairings this lesson: Charlotte-Marcus, Priya helped 3 students
• EAL translation support: Hassan (Arabic) could help Amara
• Mixed-ability groupings show 85% engagement success`;

          return { content: [{ type: "text", text: result }] };
        }

        if (focus === "engagement") {
          const result = `🎯 ENGAGEMENT ANALYSIS:

📊 PARTICIPATION METRICS:
• Questions asked: 23 (high engagement indicator)
• Help requests: 15 (students comfortable seeking support)
• Peer collaborations: 8 successful partnerships
• Off-task incidents: 3 (excellent focus)

💡 HIGH ENGAGEMENT ACTIVITIES:
• Physical measuring demonstrations: 100% participation
• Peer discussion during EQ3: All students contributed
• Hands-on container comparisons: Natural differentiation

⚠️ LOWER ENGAGEMENT MOMENTS:
• Digital quiz loading delays: 2-3 minutes lost focus
• Abstract calculation questions: 6 students disengaged
• Written explanations: EAL students struggled

🚀 TOMORROW'S ENGAGEMENT BOOSTERS:
• Start with physical measuring (builds confidence)
• Use colored water for visual appeal
• Incorporate estimation games
• Allow peer teaching opportunities
• Real-world connections (cooking measurements)`;

          return { content: [{ type: "text", text: result }] };
        }

        // Overall practical insights
        const overview = `🛠️ PRACTICAL TEACHING INSIGHTS:

🎯 LESSON EFFECTIVENESS:
• Hands-on activities: Highest engagement and understanding
• Digital elements: Some technical barriers for 2 students
• Time management: 5 minutes over, rushed ending

📚 WHAT WORKED WELL:
• Physical container demonstrations
• Peer collaboration and support
• Visual comparisons and sorting
• Real-world contexts (water bottles, cooking)

⚠️ AREAS FOR IMPROVEMENT:
• More concrete materials for calculations
• Pre-teach vocabulary for EAL learners  
• Backup plans for technology issues
• Allow more time for hands-on exploration

🔄 TOMORROW'S ADAPTATIONS:
• Start with physical materials, move to abstract
• Group struggling learners with practical activities
• Extension work ready for early finishers
• TA support scheduled for intervention groups`;

        return { content: [{ type: "text", text: overview }] };
      }
    );

    // Students needing intervention with specific strategies
    this.server.tool(
      "get_intervention_list",
      { 
        urgency: z.enum(["high", "medium", "all"]).optional(),
        includeStrategies: z.boolean().optional()
      },
      async ({ urgency = "all", includeStrategies = true }) => {
        const students = mockStudentData.studentProfiles;
        
        let filtered;
        if (urgency === "high") {
          filtered = students.filter(s => s.score < 50);
        } else if (urgency === "medium") {
          filtered = students.filter(s => s.score >= 50 && s.score < 70);
        } else {
          filtered = students.filter(s => s.score < 70);
        }
        
        filtered.sort((a, b) => a.score - b.score);
        
        let result = `🚨 INTERVENTION PRIORITY LIST (${urgency.toUpperCase()}):

        ${filtered.map((s, i) => {
          const priority = s.score < 40 ? 'URGENT 🔴' : s.score < 55 ? 'HIGH 🟠' : 'MEDIUM 🟡';
          const struggles = s.struggles && s.struggles.length > 0 ? s.struggles.slice(0, 2).join(', ') : 'Multiple areas';
          return `${i+1}. ${s.name} (${s.score}%) - ${priority}
   Background: ${s.background || 'Standard learner'}
   Key needs: ${struggles}${includeStrategies ? `\n   Strategy: ${s.intervention || 'Assessment required'}` : ''}`;
        }).join('\n\n')}

📊 INTERVENTION SUMMARY:
• Total students needing support: ${filtered.length}/${students.length}
• Urgent priority: ${students.filter(s => s.score < 40).length} students
• Teaching assistant time required: ${Math.ceil(filtered.length / 3) * 15} minutes daily`;

        if (includeStrategies) {
          result += `\n\n📚 IMMEDIATE ACTIONS REQUIRED:
• Book TA time for 1:1 support with Oliver (urgent)
• Arrange concrete materials for calculations group
• Set up EAL vocabulary support
• Contact parents for students below 50%
• Plan differentiated activities for next lesson`;
        }

        return { content: [{ type: "text", text: result }] };
      }
    );

    // Enhanced teaching insights with specific actions
    this.server.tool(
      "get_teaching_insights",
      { 
        timeframe: z.enum(["immediate", "tomorrow", "this_week"]).optional()
      },
      async ({ timeframe = "immediate" }) => {
        const data = mockStudentData;
        
        if (timeframe === "immediate") {
          const result = `⚡ IMMEDIATE TEACHING ACTIONS (End of Day):

📞 COMMUNICATIONS:
• Call Oliver's parents - significant support needed
• Email James's mum about dyslexia accommodations working well
• Note for TA: Book 15 min sessions with calculation group

📚 PREPARATION FOR TOMORROW:
• Set out measuring jugs (100ml, 250ml, 500ml, 1L)
• Prepare place value charts for millilitre work
• Print visual vocabulary cards for EAL group
• Check tech equipment - 2 students had issues today

📝 PLANNING ADJUSTMENTS:
• Extend capacity/volume concept - not secure for 8 students
• Add concrete calculation practice before moving on
• Plan peer teaching opportunities for high achievers

🎯 SUCCESS CELEBRATIONS:
• Praise persistent effort: James made 3 attempts
• Highlight peer helping: Priya supported 3 classmates
• Celebrate practical understanding shown by all students`;

          return { content: [{ type: "text", text: result }] };
        }

        if (timeframe === "tomorrow") {
          const result = `📅 TOMORROW'S LESSON PLAN ADAPTATIONS:

🚀 LESSON STARTER (10 min):
• Physical measuring review with real containers
• Students demonstrate capacity vs volume to class
• Address misconceptions from today immediately

👥 GUIDED PRACTICE (15 min):
• 4 differentiated groups as recommended in grouping tool
• Focus: Scale reading, calculations, vocabulary, extension
• TA support with intervention group

🎯 MAIN ACTIVITY (15 min):
• Practical measuring challenges
• Real-world problems (cooking recipes, filling containers)
• Peer partnerships for support

📊 ASSESSMENT OPPORTUNITIES:
• Observe scale reading accuracy
• Listen to mathematical vocabulary usage
• Check calculation strategies with manipulatives
• Note collaborative learning effectiveness

⏱️ TIMING ADJUSTMENTS:
• Allow 5 extra minutes based on today's overrun
• Have extension activities ready for early finishers
• Build in movement break for restless learners`;

          return { content: [{ type: "text", text: result }] };
        }

        // This week insights
        const result = `📅 THIS WEEK'S TEACHING FOCUS:

🎯 LEARNING GOALS REFINEMENT:
• Secure capacity vs volume understanding for whole class
• Achieve 80%+ scale reading accuracy 
• Improve millilitre calculation confidence to 70%+
• Embed mathematical vocabulary naturally

📚 CURRICULUM PACING:
• Extend capacity/volume unit by 1 day (worth it for understanding)
• Integrate measurement into daily maths warm-ups
• Connect to science - water cycle, cooking - food tech
• Prepare for next unit: Length measurement (similar skills)

👥 INTERVENTION TRACKING:
• Daily check-ins with Oliver, James, Marcus
• Weekly progress monitoring for EAL vocabulary development
• Celebrate improvements - growth mindset focus
• Document evidence for potential additional support referrals

🔄 TEACHING STRATEGY ADJUSTMENTS:
• Increase concrete manipulative use across all topics
• Build in more peer teaching opportunities
• Reduce cognitive load for working memory difficulties
• Strengthen home-school communication for key students`;

        return { content: [{ type: "text", text: result }] };
      }
    );
  }
}

export default {
  fetch(request: Request, env: Env, ctx: ExecutionContext) {
    const url = new URL(request.url);
    if (url.pathname === "/sse" || url.pathname === "/sse/message") {
      return MyMCP.serveSSE("/sse").fetch(request, env, ctx);
    }
    if (url.pathname === "/mcp") {
      return MyMCP.serve("/mcp").fetch(request, env, ctx);
    }
    return new Response("Not found", { status: 404 });
  },
};