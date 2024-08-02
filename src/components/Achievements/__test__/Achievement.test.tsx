import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import Achievement from "@/components/Achievements/Achievement";

describe("Achievement", () => {
	it('Should render the title "Make Site Responsive" ', () => {
		render(
			<Achievement
				taskTitle="Make Site Responsive"
				dateCompleted={"2024-07-01T09:42:02.925Z"}
			/>,
		);
		const title = screen.getByRole("heading", {
			name: "Completed Make Site Responsive",
		});
		expect(title).toBeInTheDocument();
	});
	it('Should render the title "Make Site Responsive" ', () => {
		render(
			<Achievement
				taskTitle="Make Site Responsive"
				dateCompleted={"2024-07-01T09:42:02.925Z"}
			/>,
		);
		const description = screen.getByText("1st of July-2024");
		expect(description).toBeInTheDocument();
	});
});
