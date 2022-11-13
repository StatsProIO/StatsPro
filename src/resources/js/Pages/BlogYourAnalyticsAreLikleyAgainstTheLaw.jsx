import React from 'react';
import {Typography} from '@mui/material';
import BlogLayout from "@/Layouts/BlogLayout";


export default function BlogYourAnalyticsAreLikleyAgainstTheLaw() {
    return (
        <BlogLayout title={'Your Analytics Are Likley Against The Law'}>
            <img src='/images/law.webp' width='100%' style={{paddingTop: '15px', paddingBottom: '15px'}}/>
            <Typography sx={{py: 1}}>
                If you are using one of the more popular website analytics providers like Google Analytics or Adobe Analytics, you're using software which behaves in a way that many countries in the European Union have determined to violate their laws. There have even been <a href="/blog/italy-google-analytics-illegal">fines levied on companies like Google</a> because of these violations. <br/><br/>

                The European Union's General Data Protection Regulation (GDPR) came into force on May 25, 2018 and strengthens and builds on the protective framework of existing EU data protection. The GDPR applies to any company that processes the personal data of EU citizens, regardless of where the company is located. The GDPR requires companies to: obtain express consent from users before collecting, using, or disclosing their personal information. Businesses must also provide users with clear and concise information about their rights under the GDPR and ensure users can easily exercise their rights.<br/><br/>
                GDPR imposes significant fines on businesses who violate its terms, including up to 4% of a company's worldwide annual revenue or €20 million (whichever is greater), whichever is greater. Google was recently fined 1 million Euros for violating GDPR in Italy. GDPR also gives people the right to lodge a complaint with the supervisory authority if they believe their rights have been violated.<br/><br/>

                GDPR is not the only law affecting website analytics. The California Consumer Privacy Act (CCPA) went into effect on January 1, 2020 and applies to all businesses that process personal information of California residents. The CCPA requires companies disclose its data collection and sharing practices to consumers and gives consumers the right to opt-out of the sale of their personal information. The CCPA also gives consumers the right to access personal information that companies have collected about them and the right to request that their personal information be erased. The CCPA imposes significant penalties on companies that violate its rules, including up to $7,500 per violation.<br/><br/>

                Still yet, GDPR and CCPA are not the only laws affecting website analytics. The EU ePrivacy Directive (also known as the Cookie Directive) came into force on May 26, 2012 and requires companies to obtain users' explicit consent before collecting, using or disclosing their personal data. The ePrivacy Directive requires companies to provide users with clear and concise information about their rights under the policy and to ensure that users can easily exercise their rights. The ePrivacy Directive imposes significant fines on companies that violate its provisions, including fines of up to €20 million.<br/><br/>

                GDPR, CCPA, and The ePrivacy Directive have been hailed by privacy advocates as landmark legislation with the teeth to be enforced. Recently, the Austrian data protection authority (DPA) has declared Google Analytics illegal. The DPA said Google Analytics violates the European Union (EU) CCPA Cookie Law on EU privacy data. The DPA said Google Analytics collects and stores personal data, including IP addresses, without the consent of the data subjects. The Data Protection Authority has ordered Google to stop using Google Analytics in Austria.
                The Data Protection Authority's decision is the latest development in a lengthy legal battle between Austrian Data Protection Commissioner Max Schrems and Google.<br/><br/>

                Schrems has argued that Google's use of personal data violates EU law. In 2015, the European Court of Justice ruled in favor of Schrems that Google's data collection practices violated EU law. The DPA ruling could have far-reaching consequences for Google. If other data protection authorities follow the DPA's example, it could mean that Google would have to stop using Google Analytics across the EU. This would be a major setback for Google, as Google Analytics is an important part of its business. Google has said it was "disappointed" with the court's decision. Google has also stated that it "will continue to work closely with the data protection authorities to ensure that we meet your expectations."<br/><br/>

                The California Consumer Privacy Act (CCPA) is a law that gives Californians more control over their personal information. The law applies to companies that do business in California and collect personal information from California residents. The law gives Californians the right to know what personal information is being collected about them, the right to know why it is being collected, the right to know where it is being collected from, the right to know if it is being sold, and that Right to opt-out of the sale of your personal information.<br/><br/>

                As more and more countries begin to examine the un-checked power that internet companies have implemented over the years, it is highly likely that more tools will be declared illegal and more fines will be issued. There are <a href="/blog/top-5-google-analytics-alternatives">many privacy-friendly analytics</a> to use instead of Google Analytics. We recommend you replace Google Analtyics with Marble Metrics in order to be fully compliant with GDPR, CCPA, and the ePrivacy Directive.
            </Typography>
        </BlogLayout>

    );
}
