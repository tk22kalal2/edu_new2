const fs = require('fs');

const lecturesFile = "Plug/lectures.json";
const newLecturesFile = "Plug/newLectures.txt";

// Function to update lectures.json
function updateLectures() {
    try {
        // Ensure lectures.json exists and is valid
        if (!fs.existsSync(lecturesFile) || fs.statSync(lecturesFile).size === 0) {
            fs.writeFileSync(lecturesFile, JSON.stringify({ lectures: [] }, null, 2));
        }

        // Read and parse existing lectures.json
        let lecturesData = JSON.parse(fs.readFileSync(lecturesFile, "utf8"));

        // Read newLectures.txt
        let newLecturesText = fs.readFileSync(newLecturesFile, "utf8").trim();
        let newLecturesArray = newLecturesText
            .split("\n\n")
            .map(item => item.trim())
            .filter(item => item.length > 0); // Remove empty entries

        // Get last used ID
        let lastId = lecturesData.lectures.length > 0 ? lecturesData.lectures[lecturesData.lectures.length - 1].id : 0;

        // Convert existing lectures into a Set to prevent duplicates
        let existingLecturesSet = new Set(lecturesData.lectures.map(lecture => lecture.html.trim()));

        // Add only new lectures
        let newEntries = [];
        newLecturesArray.forEach(lectureHTML => {
            if (!existingLecturesSet.has(lectureHTML)) {
                lastId++;
                let newEntry = { id: lastId, html: lectureHTML };
                lecturesData.lectures.push(newEntry);
                newEntries.push(newEntry);
            }
        });

        if (newEntries.length === 0) {
            console.log("✅ No new lectures to update.");
            return;
        }

        // Write updated JSON back to lectures.json
        fs.writeFileSync(lecturesFile, JSON.stringify(lecturesData, null, 2));
        console.log(`✅ Added ${newEntries.length} new lectures!`);
    } catch (error) {
        console.error("❌ Error updating lectures:", error);
        process.exit(1);
    }
}

// Run the update function
updateLectures();
