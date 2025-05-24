// 수강신청 데이터를 Firestore에 저장하는 함수
async function saveRegistration(formData) {
    try {
        const data = {
            courseName: formData.get('selectedCourse'),
            name: formData.get('name'),
            phone: formData.get('phone'),
            email: formData.get('email'),
            purpose: formData.get('purpose'),
            region: formData.get('region'),
            registrationDate: firebase.firestore.FieldValue.serverTimestamp()
        };

        // Firestore에 데이터 저장
        const docRef = await db.collection('registrations').add(data);
        console.log('Registration saved with ID:', docRef.id);
        return { success: true, data };
    } catch (error) {
        console.error('Error saving registration:', error);
        throw error;
    }
}

// 모든 수강신청 데이터 가져오기
async function getAllRegistrations() {
    try {
        const snapshot = await db.collection('registrations')
            .orderBy('registrationDate', 'desc')
            .get();
        
        return snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        }));
    } catch (error) {
        console.error('Error fetching all registrations:', error);
        throw error;
    }
}

// 특정 과목의 수강신청 목록을 가져오는 함수
async function getRegistrationsByCourse(courseName) {
    try {
        // 먼저 courseName으로만 필터링
        const snapshot = await db.collection('registrations')
            .where('courseName', '==', courseName)
            .get();

        // 결과를 메모리에서 정렬
        const registrations = snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        }));

        // 날짜 기준으로 정렬
        return registrations.sort((a, b) => {
            const dateA = a.registrationDate ? a.registrationDate.seconds : 0;
            const dateB = b.registrationDate ? b.registrationDate.seconds : 0;
            return dateB - dateA; // 내림차순 정렬
        });
    } catch (error) {
        console.error('Error fetching registrations for course:', courseName, error);
        throw error;
    }
}

// 수강신청 정보 업데이트 함수
async function updateRegistration(registrationId, updateData) {
    try {
        await db.collection('registrations').doc(registrationId).update({
            ...updateData,
            updatedAt: firebase.firestore.FieldValue.serverTimestamp()
        });
        return { success: true };
    } catch (error) {
        console.error('Error updating registration:', error);
        throw error;
    }
}

// 수강신청 취소 함수
async function deleteRegistration(registrationId) {
    try {
        await db.collection('registrations').doc(registrationId).delete();
        return { success: true };
    } catch (error) {
        console.error('Error deleting registration:', error);
        throw error;
    }
} 